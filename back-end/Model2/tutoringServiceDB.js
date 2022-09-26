// This file models the database and is kind of like a controller, but these functions are not request handlers; they just:
//   - connect to database
//   - get collections/models (user or request)
//   - interact with the database to do the crud operations
//   - return a record or anything else we want to return or null but do not return a response which is returned by request handlers in routes
// The request handlers are still in the routes



const connection = require('./connection');

const tutoringServiceDB = {};

tutoringServiceDB.login = async (email) => {
    let userModel = await connection.getUserCollection();
    let userData = await userModel.findOne({email: email});
    return userData ? userData : null;
}

tutoringServiceDB.register = () => {

}

tutoringServiceDB.createRequest = () => {

}

tutoringServiceDB.getAllUsers = () => {

}

tutoringServiceDB.getAllRequests = () => {

}