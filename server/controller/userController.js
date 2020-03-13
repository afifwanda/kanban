const { User } = require('../models/index.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const errorHandler = require('../middleware/errorHandler.js')
require('dotenv').config()

class UserController{
    static register(req,res,next){
        let obj = {
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
        }

        User.create(obj)
        .then(result=>{
            res.status(201).json(result)
        })
        .catch(err=>{
            next({status: 500, msg: 'Internal server error'})
        })
    }

    static login(req,res,next){
        let email = req.body.email
        let password = req.body.password
        User.findOne({where:{email:email}})
        .then(user=>{
            return bcrypt.compare(password,user.password)
            .then(result=>{
                if(result===true){
                    let token = jwt.sign({email:user.email,id:user.id,name:user.name},process.env.JWT_KEY)
                    res.status(200).json({ token })
                } else{
                    res.status(400).json({'msg' : 'wrong username/password!'})
                }
            })
        })
        .catch(err=>{
            next({status: 500, msg: 'Internal server error'})
        })
    }

}

module.exports = UserController