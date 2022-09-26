const { request } = require('http');

requestRepo = require('../Models/request');

exports.createRequest = (requestId, req, res, next) => {

    requestObj = {
        requestId: requestId,
        date: req.body.date,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        city: req.body.city,
        subject: req.body.subject,
        timeFrame: req.body.timeFrame,
        availability: req.body.availability
    };
    requestRepo.create(requestObj).then(request => {
        res.status(200).json({
            message: "Request successfully created",
            request: request
        });
    });
}

exports.getAllRequests = (req, res, next) => {
    requestRepo.find().then(requests => {
        res.status(200).json({
            requests: requests
        });
    });   
};

exports.getRequest = (req, res, next) => {
    requestRepo.find({requestId: req.params.id}).then(foundRequest => {
        res.status(200).json({
            request: foundRequest
        });
    });   
};

exports.editRequest = (req, res, next) => {
    requestRepo.findOneAndUpdate({requestId: req.params.id}, req.body).then(result => {
        res.status(200).json({   
            message: "Request was successfully updated!"
        });
    })
};

exports.deleteRequest = (req, res, next ) => {
    requestRepo.findOneAndDelete({requestId: req.params.id}).then(result => {
        res.status(200).json({
            message: "deleteRequest worked"
        });
    });   
};

