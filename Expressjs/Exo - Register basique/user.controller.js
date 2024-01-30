const bcrypt = require('bcrypt');
const UserModel = require('./user.model');

const UserController = {

    register: async (req, res) => {

        const { email, password, username, age, firstname, lastname } = req.body;
        const hashedPassword = UserModel.hashPassword(password);
        const newUser = { email, password: hashedPassword, username, age, firstname, lastname };

        await UserModel.save(newUser);

        res.status(201).send({message: 'User created successfully'})
    },

    login: async (req, res) => {

        const { email, password } = req.body;
        const user = await UserModel.findByEmail(email);

        if (!user) {
            return res.status(400).send({message: 'Email not found'});
        }
        if (bcrypt.compareSync(password, user.password)) {
            res.status(200).send({message: 'Login successful'});
        } else {
            res.status(400).send({message: 'Incorrect password'});
        }
    },

    list: async (req, res) => {
        const users = await UserModel.getUsers();

        const usersInfo = users.map(({lastname, firstname, username, age}) => ({lastname, firstname, username, age}));
        res.json(usersInfo);
    }
}

module.exports = UserController;
