const sql = require('mssql');

const handleGetAllUsers = async () => {
    try {
        const request = await sql.query `SELECT * FROM users`
        return request;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const UserModel = {
    getAll: handleGetAllUsers
};

module.exports = UserModel;
