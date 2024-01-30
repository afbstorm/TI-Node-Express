// Importation des modules
const bcrypt = require('bcrypt') // Package permettant de hasher des informations
const RegisterModel = require('./register.model');


const RegisterController = {
    register: async (req, res) => {
        // Destructuring du body pour récupérer les informations proprement de req(uête)
        const { email, password, username, age } = req.body;

        // Début de la transaction
        try {
            // On va hash le password selon un certain degré de salt (complexité)
            const hashedPassword = bcrypt.hashSync(password, 10);

            // On va appeler le model qui va contacter la DB
            const newUser = RegisterModel.register({email, hashedPassword, username, age});

            // On va vérifier que la transaction se soit bien déroulée, si oui, on répond pas un 200
            if (newUser) {
                res.status(200).send(newUser)
            }
        } catch (error) {
            console.error(error)
            res.status(500).send('Server error')
        }
    }
}

module.exports = RegisterController;
