const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String
    },
    pw: {
        type: String
    },
    pw_confirm: {
        type: String
    }
})

const User = mongoose.model("User", userschema);
module.exports = User;