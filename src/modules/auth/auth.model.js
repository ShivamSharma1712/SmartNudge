const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,

    phone: String,
    college: String,
    rollNo: String,
    branch: String,
    semester: String,
    dob: String,

    googleAccessToken: String,
    googleRefreshToken: String

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);