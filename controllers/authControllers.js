const User = require("../model/userModel")
const bycrypt = require("bcryptjs")

exports.signup = async(req, res, next) =>{
    try {
        const {username, password} = req.body
        const hashpassword =  await bycrypt.hash(password, 12)
        const newuser = await User.create({
            username: username,
            password: hashpassword
        })
        req.session.user = newuser
        res.status(201).json({
            status: "Success",
            data: {
                user: newuser
            }
        })
    } catch (e) {
        console.log(e)
        res.status(400).json({status: "Failed",})
    }
}

exports.login = async(req, res, next) =>{
    try {
        const {username, password} = req.body
        const user = await User.findOne({username})
        if (!user) {
            res.status(404).json({status: "Failed",message: "user not found"})
        } 
        const isCorrect =  await bycrypt.compare(password, user.password)
        console.log("isCorrect")
        console.log(isCorrect)
        if (isCorrect) {
            req.session.user = user
            res.status(200).json({
                status: "Success",
            })
        } else {
            res.status(404).json({status: "Failed",message: "Password incorrect username or password"})
        }
    } catch (error) {
        console.log("e--------------------")
        console.log("e--------------------")
        console.log(e)
        res.status(400).json({status: "Failed",})
    }
}