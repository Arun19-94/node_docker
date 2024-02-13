const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        require:[true, "POST MUST HAVE title"]
    },
    body:{
        type: String,
        require:[true, "POST MUST HAVE body"]
    }

})
const Post = mongoose.model("Post", postSchema)
module.exports = Post