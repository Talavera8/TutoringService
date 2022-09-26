const userRepo = require('../Models/user');

module.exports = (req, res, next) => {
    try {
        userRepo.find().then(users => {
            next(users.length + 101);
        });
    }
    catch (err) {
        next(101);
    }   
};