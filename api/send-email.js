const nodemailer = require('nodemailer');

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
    if (req.method === 'POST') {
        const { firstname, email, phone, date, location, me, message } = req.body;

        const mailOptions = {
            from: email, // Utilisez l'e-mail du client
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
            console.error('Erreur d\'envoi de l\'e-mail:', error);
            res.status(500).send('Erreur lors de l\'envoi de l\'e-mail');
        }
    } else {
        res.status(405).send('Méthode non autorisée');
    }
};
