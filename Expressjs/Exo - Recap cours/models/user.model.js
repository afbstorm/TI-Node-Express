const bcrypt = require('bcrypt');
const sql = require('mssql');

const handleGetAllUsers = async () => {
    try {
        const request = await sql.query `SELECT * FROM users`
        return request;
    } catch (err) {
        console.error(err);
    }
}

const handleGetUserById = async (data) => {
    try {
        const { id } = data;
        const request = new sql.Request();
        request.input('id', sql.Int, id);
        const result = await request.query(
            `SELECT * FROM users WHERE id = @id`
        );
        return result;
    } catch (err) {
        console.error(err);
    }
}

const handleAddJwt = async (data) => {
    try {
        const { token, id } = data;
        const request = await sql.query `UPDATE users SET jwt = ${token} WHERE id = ${id}`
        return request;
    } catch (err) {
        console.error(err);
    }
}

const handleUserRegister = async (data) => {
    try {
        const { email, hashedPassword, firstname, lastname, funFact } = data;
        // Create a new request using the new sql.Request() object
        const request = new sql.Request();

        // Use .input() method to sanitize inputs
        request.input('email', sql.VarChar, email)
        request.input('hashedPassword', sql.VarChar, hashedPassword)
        request.input('firstname', sql.VarChar, firstname)
        request.input('lastname', sql.VarChar, lastname)
        request.input('funFact', sql.VarChar, funFact);

        // Use the sanitized inputs in query
        const result = await request.query(
            `INSERT INTO users (firstname, lastname, hashedPassword, email, username,funFact)
            VALUES (@firstname, @lastname, @hashedPassword, @email,
            LOWER(CONCAT(SUBSTRING(@firstname, 1, 3), SUBSTRING(RIGHT(@lastname, 3), 1, 3))), @funFact)`
        );
        return result;
    } catch (err) {
        console.error(err);
    }
}

const handleUpdateUser = async (data) => {
    try {
        const { id, firstname, lastname, email, password, funFact, hashedPassword } = data;
        const request = new sql.Request();
        request.input('id', sql.Int, id);
        request.input('email', sql.VarChar, email);
        request.input('firstname', sql.VarChar, firstname);
        request.input('lastname', sql.VarChar, lastname);
        request.input('funFact', sql.VarChar, funFact);
        if(password){
            request.input('hashedPassword', sql.VarChar, hashedPassword);
            return request.query(`UPDATE users SET firstname = @firstname, 
                lastname = @lastname, hashedPassword = @hashedPassword,
                email = @email, funFact = @funFact WHERE id = @id`);
        }
        return request.query(`UPDATE users SET firstname = @firstname, 
            lastname = @lastname, email = @email, funFact = @funFact WHERE id = @id`);
    } catch (err) {
        console.error(err);
    }
};

const UserModel = {
    getAll: handleGetAllUsers,
    getUserById: handleGetUserById,
    addJwt: handleAddJwt,
    register: handleUserRegister,
    update: handleUpdateUser
};

module.exports = UserModel;
