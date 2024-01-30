const RegisterModel = {

    // Récupération des données (data) et envoi au serveur (pas ici)
    register: (data) => {
        const { email, hashedPassword, username, age } = data;
        return `User is register with the email : ${email}`
    }
};

module.exports = RegisterModel;
