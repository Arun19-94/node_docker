const Post = require("../model/postModel");

exports.getAllPost = async(req, res, next) =>{
    try {
        const posts = await Post.find({})
        res.status(200).json({
            status: "Succes",
            results:posts.length,
            data: {
                posts
            }
        })
    } catch (e) {
        res.status(400).json({status: "Failed",})
    }
}

exports.getPost = async(req, res, next) =>{
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json({
            status: "Succes",
            data: {
                post
            }
        })
    } catch (e) {
        res.status(400).json({status: "Failed",})
    }
}

exports.createPost = async(req, res, next) =>{
    try {
        const post = await Post.create(req.body)
        res.status(200).json({
            status: "Succes",
            data: {
                post
            }
        })
    } catch (e) {
        res.status(400).json({status: "Failed",})
    }
}

exports.updatePost = async(req, res, next) =>{
    try {
        console.log("updatePost")
        console.log(req)
        const post = await Post.findByIdAndUpdate(req.params.id, req.body,{
            new : true,
            runValidators: true
        })
        res.status(200).json({
            status: "Succes",
            data: {
                post
            }
        })
    } catch (e) {
        console.log("err")
        console.log(err)
        res.status(400).json({status: "Failed",})
    }
}

exports.deletePost = async(req, res, next) =>{
    try {
        const post = await Post.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: "Succes",
        })
    } catch (e) {
        res.status(400).json({status: "Failed",})
    }
}