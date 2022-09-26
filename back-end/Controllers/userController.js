const userRepo = require('../Models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser = (userId, req, res, next) => {
    let hash;
    bcrypt.hash(req.body.password, 10).then(hash => {
        userObj = {
            userId: userId,
            userType: req.body.userType,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            city: req.body.city,
            email: req.body.email,
            password: hash,
            hourlyRate: req.body.hourlyRate,
            subject: req.body.subject,
            profilePhoto: req.body.profilePhoto,
            biography: req.body.biography
        };
        userRepo.create(userObj).then(user => {
            console.log(user);
            res.status(200).json({
                message: "User created successfully!",
                user: user
            });
        });
    });
};

exports.login = (req, res, next) => {
    let user;
    userRepo.findOne({ email: req.body.email })
        .then(fetchedUser => {
            if (!fetchedUser) {
                return res.status(404).json({
                    message: "That email account was not found!"
                });
            }
            user = fetchedUser;
            return bcrypt.compare(req.body.password, fetchedUser.password);
        })
        .then(passwordMatched => {
            if(!passwordMatched) {
                return res.status(404).json({
                    message: "That password does not match an existing account"
                });
            }
            const token = jwt.sign({
                userId: user.userId,
                email: user.email,
                userType: user.userType
            }, 'AVeryLongStringSecretHere', { expiresIn: "1h"});

            res.status(201).json({
                message: "Login successful!",
                token: token,
                userId: user.userId,
                userType: user.userType,
                expiresIn: 3600   
            });
        })
        .catch(err => {
            res.status(404).json({
                message: "Login failed!",
                token: null
            });
        });
}

exports.getAllUsers = (req, res, next) => {
    userRepo.find().then(users => {
        res.status(200).json({
            users: users
        });
    });
};

exports.getUser = (req, res, next) => {
    userRepo.find({ userId: req.params.id }).then(foundUser => {
        console.log("Found user from the backend:");
        console.log(foundUser);
        res.status(200).json({
            message: "User successfully fetched",
            user: foundUser
        });
    });
};

exports.editUser = (req, res, next) => {
    userRepo.findOneAndUpdate({ userId: req.body.userId }, req.body).then(result => {
        console.log(result);
        res.status(200).json({
            message: "User was successfully edited!"
        });
    });
};

exports.deleteUser = (req, res, next) => {
    userRepo.findOneAndDelete({ userId: req.params.id }).then(() => {
        res.status(200).json({
            message: "User successfully deleted!"
        });
    }).catch(err => {
        res.status(404).json({
            message: "That user was not found."
        });
    });
};
