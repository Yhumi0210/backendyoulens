const nodemailer = require('nodemailer');
const { validateEmailData } = require('./validator');

// Configurez Nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Exportez une fonction handler pour Vercel
module.exports = async (req, res) => {
    // Autorise les requêtes provenant de l'origine https://youlens.fr
    res.setHeader('Access-Control-Allow-Origin', 'https://youlens.fr');

    // Autorise les méthodes HTTP utilisées par le frontend
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

    // Autorise certains en-têtes personnalisés si nécessaire
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Réponse pour la requête OPTIONS (pré-vol)
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Le code de votre fonction existante commence ici
    if (req.method === 'POST') {
        const { firstname, email, phone, date, location, me, message } = req.body;

        // Validation des données
        const errors = validateEmailData({ firstname, email, phone, date, location, me, message });
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const mailOptions = {
            from: email, // Utilise l'email du client
            to: 'youlens.production@gmail.com', // Votre adresse e-mail
            subject: 'Nouveau message | Guillaume Court Wedding Films',
            text: `
                Prénom: ${firstname}
                Email: ${email}
                Téléphone: ${phone}
                Date du projet: ${date}
                Lieu de réception: ${location}
                Comment ils ont entendu parler de toi: ${me}
                Message: ${message}
            `
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).send('E-mail envoyé');
        } catch (error) {
            console.error("Erreur d'envoi de l'e-mail:", error);
            res.status(500).send('Erreur lors de l\'envoi de l\'e-mail');
        }
    } else {
        res.status(405).send('Méthode non autorisée');
    }
};