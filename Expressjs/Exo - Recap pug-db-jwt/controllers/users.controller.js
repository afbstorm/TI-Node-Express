const UserModel = require('../models/users.model');
const sqlConfig = require('../db/database');
const sql = require('mssql');

const handleGetAllUsersRequest = async (req, res) => {
    try {
        await sql.connect(sqlConfig);
        const result = await UserModel.getAll();
        if (result) {
            res.render('./pages/list', {userList: result.recordset})
            return res.status(200);
        }

    } catch (error) {
        console.error(error) // TODO -> transformer en fonction réutilisable
    }
}

const UserController = {
    getAll: handleGetAllUsersRequest
}

module.exports = UserController;
