const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, 'AVeryLongStringSecretHere'); 
        req.userData = { userId: decodedToken.userId, email: decodedToken.email, userType: decodedToken.userType };
        next();
    }
    catch {
        res.status(404).json({
            message: "No authorized access"
        });
    }
}