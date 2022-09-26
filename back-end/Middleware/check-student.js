module.exports = (req, res, next) => {
    const userType = req.userData.userType;
    if (userType !="student") {
        res.status(404).json({
            message: "User not authorized!"
        })
    }
    next();
}