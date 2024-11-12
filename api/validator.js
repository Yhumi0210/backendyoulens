// Fonction de validation
function validateEmailData(data) {
    const errors = [];

    // Vérification des champs obligatoires
    if (!data.firstname || typeof data.firstname !== 'string') {
        errors.push("Prénom invalide");
    }
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push("Email invalide");
    }
    if (data.phone && !/^\d{10}$/.test(data.phone)) { // Vérifie le format du téléphone, si fourni
        errors.push("Numéro de téléphone invalide");
    }
    if (!data.date) {
        errors.push("Date du projet requise");
    }
    if (!data.location || typeof data.location !== 'string') {
        errors.push("Lieu de réception invalide");
    }
    if (!data.message || typeof data.message !== 'string') {
        errors.push("Message invalide");
    }

    return errors;
}

module.exports = { validateEmailData };
