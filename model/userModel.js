const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        require:[true, "USER MUST HAVE USERNAME"],
        unique: true
    },
    password:{
        type: String,
        require:[true, "POST MUST HAVE PASSWORD"]
    }

})
const User = mongoose.model("User", userSchema)
module.exports = User