const express = require('express');
const checkAuth = require('../Middleware/check-auth');

const { createUser, 
        login, 
        getAllUsers, 
        getUser, 
        editUser, 
        deleteUser } = require('../Controllers/userController');

const generateUserId = require('../Middleware/generateUserId');

const usersRouter = express.Router();

usersRouter.get("", checkAuth, getAllUsers);
usersRouter.get("/:id", getUser);
usersRouter.post("", generateUserId, createUser);
usersRouter.post("/login", login);
usersRouter.patch("/:id", checkAuth, editUser);
usersRouter.delete("/:id", checkAuth, deleteUser);

module.exports = usersRouter;