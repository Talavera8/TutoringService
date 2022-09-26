const requestRepo = require('../Models/request');

module.exports = (req, res, next) => {
    try {
        requestRepo.find().then(requests => {
            next(requests.length + 101);
        });
    }
    catch (err) {
        next(101);
    }   
};
