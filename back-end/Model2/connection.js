const { mongoose } = require("mongoose");

const requestSchema = mongoose.Schema({
    requestId: { type: Number, required: true },
    date: { type: Date, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    city: { type: String, required: true },
    subject: { type: String, required: true },
    timeFrame: { type: String, required: true },
    availability: { type: [String], required: true }
});

const userSchema = mongoose.Schema({
    userId: { type: Number, required: true },
    userType: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    city: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    hourlyRate: { type: Number, required: false },
    subject: { type: [String], required: false },
    profilePhoto: { type: String, required: false },
    biography: { type: String, required: false }
});

let throwError = (message, statusCode) => {
    let err = new Error(message);
    err.status = statusCode
    throw err;
}

let connection = {};

connection.createConnection = () => {
    return mongoose.connect("mongodb+srv://Maribel:FamiliaEspecial8*@cluster0.5pqne.mongodb.net/tutoringServiceApp?retryWrites=true&w=majority")
}

connection.getUserCollection = async () => {
    let database = await connection.createConnection();
    let userModel = await database.model("User", userSchema);
    return userModel;
}

//  or
// connection.getUserCollection = () => {
//   return connection.createConnection.then(database => {
//      return database.model('User', userSchema);
//   })
//   .catch(err => {
//      throwError('Database Connection Failed', 500)
//   });
// }

connection.getRequestCollection = async () => {
    let database = await connection.createConnection();
    let requestModel = database.model('Request', requestSchema);
    return requestModel;
}

// or
// connection.getRequestCollection = () => {
//     return connection.createConnection.then(database => {
//         return database.model('Request', requestModel);
//     })
//     .catch(err => {
//         throwError('Database Connection Failed', 500)
//     })
// }

module.exports = connection;


