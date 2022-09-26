module.exports = (req, res, next) => {
    const userType = req.userData.userType;
    if (userType !="tutor") {
        res.status(404).json({
            message: "User not authorized!"
        })
    }
    next();
}