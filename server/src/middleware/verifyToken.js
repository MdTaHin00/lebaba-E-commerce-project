
const jwt =  require('jsonwebtoken');
const { successResponse, errorResponse } = require('../utills/responseHander');

const JWT_SECRET = process.env.JWT_SECRET ;

const verifyToken = (req, res, next) => {
    try {

        //* body thaka cookie backend run kola
        const token =  req.cookies.token; //TODO: uncomment this when done
        
        // const token = req.headers.authorization?.split(' ')[1]
        if(!token) {
            return successResponse(res, 401, "Unauthorized Accesss!")
        }
        const decoded = jwt.verify(token,  JWT_SECRET);

        if(!decoded.userId) {
            return res.status(403).send({message: "Access denied!"})
        }

        req.userId = decoded.userId;
        req.role = decoded.role;
        next();

    } catch (error) {
        errorResponse(res, 500, "Invalid Token!", error);
    }

}

module.exports = verifyToken;