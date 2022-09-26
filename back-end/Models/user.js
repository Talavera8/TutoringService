const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

mongoose.connect("mongodb+srv://Maribel:FamiliaEspecial8*@cluster0.5pqne.mongodb.net/tutoringServiceApp?retryWrites=true&w=majority")
       .then(() => {
           console.log("Connection to database was successful!");
       });

const userSchema = mongoose.Schema({
    userId: { type: Number, required: true },
    userType: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true}, 
    city: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    hourlyRate: { type: Number, required: false },
    subject: { type: [String], required: false },
    profilePhoto: { type: String, required: false },
    biography: { type: String, required: false }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
