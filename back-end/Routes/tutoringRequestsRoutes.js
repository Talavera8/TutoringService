const express = require('express');
const checkAuth = require('../Middleware/check-auth');
const checkStudent = require('../Middleware/check-student');
const checkTutor = require('../Middleware/check-tutor');


const generateRequestId = require('../Middleware/generateRequestId');
const { 
    createRequest, 
    createManyRequests, 
    getAllRequests, 
    getRequest, 
    editRequest, 
    deleteRequest, 
    deleteRequestByName} = require('../Controllers/requestController');

const requestsRouter = express.Router();

requestsRouter.post('', checkAuth, generateRequestId, createRequest);
requestsRouter.get('', checkAuth, getAllRequests);
requestsRouter.get('/:id', getRequest);
requestsRouter.patch('/:id', checkAuth, checkStudent, editRequest);
requestsRouter.delete("/:id", checkAuth, checkStudent, deleteRequest);

module.exports = requestsRouter;





