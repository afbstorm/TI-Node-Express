const { DB_NAME, DB_PSW, DB_USER } = process.env;

// Création de la connection sql server
const sqlConfig = {
    user: DB_USER,
    password: DB_PSW,
    database: DB_NAME,
    server: 'localhost',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 300000
    },
    options: {
        trustServerCertificate: true
    }
};

module.exports = sqlConfig;

