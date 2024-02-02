const UserModel = require('../models/user.model');
const sqlConfig = require('../db/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sql = require('mssql');

const handleGetAllUsersRequest = async (req, res) => {
    try {
        await sql.connect(sqlConfig);
        const result = await UserModel.getAll();
        if (result) {
            res.render('./pages/list', {userList: result.recordset});
            return res.status(200);
        }
    } catch (err) {
        handleErrors(err, res)
    }
}

const handleGetUserByIdRequest = async (req, res) => {
    try {
        const { id } = req.params;
        await sql.connect(sqlConfig)
        const result = await UserModel.getUserById({id});
        if (result) {
            res.render('./pages/user', {title: "Here's the details of", userDetail: result.recordset});
            return res.status(200);
        }
    } catch (err) {
        handleErrors(err, res)
    }
}

const handleUserLoginRequest = async (req, res) => {
    try {
        const { method, body } = req;
        if (method === 'GET') {
            res.render('./pages/login')
        }
        if (method === 'POST') {
            await sql.connect(sqlConfig);
            const { email, password } = body;
            const request = new sql.Request();
            request.input("email", sql.VarChar, email);
            const result = await request.query `SELECT * FROM users WHERE email = @email`;
            const user = result.recordset[0];
            if (!user) {
                console.log('No such user exist');
                return res.status(404).send({message: 'An error occured'});
            }

            const id = user.id;
            const payload = { userId: id, email: email };
            const options = { expiresIn: '1d' };
            const secret = process.env.JWT_SECRET;

            if (user.jwt) {
                jwt.verify(user.jwt, secret, (err) => {
                    if (err) {
                        const token = jwt.sign(payload, secret, options);
                        const clientJwt = UserModel.addJwt({token, id});
                        if (clientJwt) {
                            return res.cookie('Authorization', `${token}`).status(200);
                        }
                    } else {
                        console.log('Connected')
                        return res.cookie('Authorization', `${user.jwt}`).status(200).redirect('/list');
                    }
                });
            } else if (password) {
                const isPasswordValid = bcrypt.compareSync(password, user.hashedPassword);
                if (!isPasswordValid) {
                    return res.status(401).send('Invalid password');
                }

                const token = jwt.sign(payload, secret, options);
                const clientJwt = await UserModel.addJwt({token, id});
                if (clientJwt) {
                    return res.cookie('Authorization', `${token}`).status(200).redirect('/list')
                }
            }
        }
    } catch (err) {
        handleErrors(err, res)
    }
}

const handleUserRegisterRequest = async (req, res) => {
    try {
        const { method, body } = req;
        if (method === 'POST') {
            await sql.connect(sqlConfig);
            const { password, email, firstname, lastname, funFact } = body;
            const hashedPassword = bcrypt.hashSync(password, 10);
            const result = await UserModel.register({email, hashedPassword, firstname, lastname, funFact});
            if (result) {
                res.status(200);
                return res.redirect('/login');
            }
        } else {
            res.render('./pages/register')
        }
    } catch (err) {
        handleErrors(err, res)
    }
};

const handleUpdateUserRequest = async (req, res) => {
    try {
        const { method, body } = req;
        const { id } = req.params;
        if (method === 'GET') {
            const result = await UserModel.getUserById({id});
            if (result) {
                const user = result.recordset[0]
                return res.render(`./pages/update`, {user});
            }
        } else if (method === 'POST') {
            await sql.connect(sqlConfig);
            const { oldPassword, newPpassword, email, firstname, lastname, funFact } = body;
            if(oldPassword && newPpassword){
                const result = await UserModel.getUserById({id});
                const user = result.recordset[0]
                let hashedPassword = bcrypt.compareSync(oldPassword, user.hashedPassword)
                if (hashedPassword) {
                    hashedPassword = bcrypt.hashSync(newPpassword, 10);
                    await UserModel.update({id, password: hashedPassword});
                }
            }
            await UserModel.update({id, email, firstname, lastname, funFact});
            return res.redirect('/list');
        }
    } catch (err) {
        handleErrors(err, res)
    }
};

const handleProtectedRouteRequest = async (req, res, next) => {
    try {
        const token = req.cookies.Authorization;
        const secret = process.env.JWT_SECRET;
        if (token == null) {
            return res.status(401).send({message: 'An error occured'});
        }

        jwt.verify(token, secret, (err, payload) => {
            if (err) {
                console.error(err);
                return res.status(403).send({message: 'An error occured'});
            } else {
                req.user = payload;
                res.status(201);
                next()
            }
        });
    } catch (err) {
        handleErrors(err, res)
    }
}

const handleErrors = (err, res) => {
    console.error(err);
    res.status(404).send({message: 'An error occured'});
}

const UserController = {
    getAll: handleGetAllUsersRequest,
    getUserById: handleGetUserByIdRequest,
    login: handleUserLoginRequest,
    register: handleUserRegisterRequest,
    update: handleUpdateUserRequest,
    protected: handleProtectedRouteRequest
};

module.exports = UserController;

