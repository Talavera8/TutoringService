const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

mongoose.connect("mongodb+srv://Maribel:FamiliaEspecial8*@cluster0.5pqne.mongodb.net/tutoringServiceApp?retryWrites=true&w=majority")
       .then(() => {
           console.log("Connection to database was successful!");
       });

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

requestSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Request", requestSchema);