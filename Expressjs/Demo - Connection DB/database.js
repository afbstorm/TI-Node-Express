const bcrypt = require('bcrypt');
const sql = require('mssql');

// Récupération des variables d'environnement
const { DB_USER, DB_PWD, DB_NAME, DB_SERVER } = process.env;

// Déclaration de la configuration de la connection à la DB
const pool = new sql.ConnectionPool({
    user: DB_USER,
    password: DB_PWD,
    database: DB_NAME,
    server: DB_SERVER,
    pool: {
        max: 10,
        min: 0
    },
    options: {
        trustServerCertificate: true
    }
});

// Fonction de connection à la DB
const connectDB = async () => {
    try {
        await pool.connect();
        console.log('Connected to the database');
    } catch (error) {
        console.error('Database connection error: ', error);
        process.exit(1);
    }
};

connectDB();

// Déclarations de fonctions qui vont intéragir avec les routes (controllers et models alike)
const queries = {
    getAll: async (req, res) => {
        try {
            // Result va attendre un résultat de la requête initialisé par la pool de connection DB
            const result = await pool.request().query('SELECT * FROM users');
            const users = result.recordset.map(user => user)
            res.status(200).send({message: 'Users retrieved', users});
        } catch (error) {
            console.error(error);
            res.status(404).send({message: 'An error occured'});
        }
    },

    addUser: async (req, res) => {
        const { password, email, firstname, lastname } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);

        try {

            const result = await pool.request()
                .input('firstname', sql.VarChar, firstname)
                .input('lastname', sql.VarChar, lastname)
                .input('hashedPassword', sql.VarChar, hashedPassword)
                .input('email', sql.VarChar, email)
                .query('INSERT INTO users (firstname, lastname, hashedPassword, email, username) values (@firstname, @lastname, @hashedPassword, @email, LOWER(CONCAT(SUBSTRING(@firstname, 1, 3), SUBSTRING(@lastname, LEN(@lastname)-2, 3))))')
            console.log(result)
            res.status(200).send({message: 'Ajout effectué'})
        } catch (error) {
            console.error(error);
            res.status(500).send({message: 'An error occured :', error})
        }
    },

    getUserById: async (req, res) => {
        const { id } = req.params;
        try {
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('SELECT * FROM users WHERE id = @id')

            console.log(result);
            res.status(200).send({message: 'User retrieved'})
        } catch (error) {
            console.error(error);
            res.status(500).send({message: 'An error occured :', error})
        }
    },

    deleteUser: async (req, res) => {
        const { id } = req.params;
        try {
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('DELETE FROM users WHERE id = @id')
            console.log(result);
            res.status(200).send({message: 'User deleted'})
        } catch (error) {
            console.error(error);
            res.status(500).send({message: 'An error occured :', error})
        }
    },

    updateUser: async (req, res) => {
        const { id } = req.params;
        const { firstname, lastname, email, newPassword, oldPassword } = req.body;

        try {

            const userQuery = await pool.request()
                .input('id', sql.Int, id)
                .query('SELECT * FROM users WHERE id = @id')
            const user = userQuery.recordset[0];

            if (!user) {
                res.status(404).send({message: 'No such user'})
            }

            let hashedPassword = user.hashedPassword;
            if (newPassword && oldPassword) {
                const isPasswordValid = bcrypt.compareSync(oldPassword, hashedPassword);
                if (!isPasswordValid) {
                    return res.status(401).send({message: 'Invalid password'});
                } else {
                    hashedPassword = bcrypt.hashSync(newPassword, 10);
                }
            }

            const result = await pool.request()
                .input('id', sql.Int, id)
                .input('firstname', sql.VarChar, firstname)
                .input('lastname', sql.VarChar, lastname)
                .input('hashedPassword', sql.VarChar, hashedPassword)
                .input('email', sql.VarChar, email)
                .query('UPDATE users SET firstname = @firstname, lastname = @lastname, hashedPassword = @hashedPassword, email = @email WHERE id = @id')

            console.log(result);
            res.status(200).send({message: 'User updated'})
        } catch (error) {
            console.error(error);
            res.status(500).send({message: 'An error occured :', error})
        }
    }
}

module.exports = queries;
