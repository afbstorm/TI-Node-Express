const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

// Constante qui va cibler le fichier DB
const dbPath = path.join(__dirname+'/db.json');

const UserModel = {

    // Récupération de la liste des users et parsing des infos
    getUsers: async () => {
        const data = await fs.readFile(dbPath, 'utf-8');
        return JSON.parse(data)
    },

    // Récupération de la liste des users, injection d'un nouveau user, ré-écriture du fichier db
    save: async (user) => {
        const users = await UserModel.getUsers();
        users.push(user);
        await fs.writeFile(dbPath, JSON.stringify(users, null, 2))
    },

    // Recherche d'un user, s'il existe return true, si pas return false
    findByEmail: async (email) => {
        const users = await UserModel.getUsers();
        return users.find(user => user.email === email);
    },

    // Hashing du password
    hashPassword: (password) => {
        return bcrypt.hashSync(password, 10)
    }
};

module.exports = UserModel;
