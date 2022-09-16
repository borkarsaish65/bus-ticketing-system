const userLoginModel = require("../models/user-login.model");
const HttpException = require('../helper/HttpException');
const jwt = require('jsonwebtoken');

const auth = (role=['standard','admin']) => {
    return async function(req, res, next) {
        try {

            const authHeader = req.headers.authorization;
            const bearer = 'Bearer ';
            if (!authHeader || !authHeader.startsWith(bearer)) {
                throw new HttpException(401, 'Access denied. No token sent!');
            }

            const token = authHeader.replace(bearer, '');
            const secretKey = process.env.JWT_KEY || "";

            // Verify Token
            const decoded = jwt.verify(token, secretKey);

            const userData = await userLoginModel.findAll({id:decoded.id});

            const ownerAuthorized =req.params.user_id == userData[0].id;

            const ownerAuthThroughBody =req.body.user_id == userData[0].id;

            if (!ownerAuthorized && !ownerAuthThroughBody)
                throw new HttpException(401, 'Unauthorized');

            if(!role.includes(userData[0].role))
            {
                throw new HttpException(401, 'Unauthorized. Cannot access this route.');      
            }


            next();


        } catch (e) {
            e.status = 401;
            next(e);
        }


    }
}

module.exports = auth;