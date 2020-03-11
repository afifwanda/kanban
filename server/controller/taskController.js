const { Task } = require('../models/index.js')
const axios = require('axios')

class TaskController{

    static view(req,res,next){
        Task.findAll({where:{userId:req.userData.id}})
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            next({status: 500, msg: 'Internal server error'})
        })
    }

    static add(req,res,next){
        let obj = {
            title : req.body.title,
            description : req.body.description,
            category : req.body.category,
            userId : req.userData.id
        }
        Task.create(obj)
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            next({status: 500, msg: 'Internal server error'})
        })
    }

    static getTask(req,res,next){
        Task.findOne({where:{id:req.params.id}})
        .then(result=>{
            if(result){
                res.status(200).json(result)
            } else{
                next({status: 404, msg: 'Data not found!'})
            }
        })
        .catch(err=>{
            next({status: 500, msg: 'Internal server error'})
        })
    }

    static update(req,res,next){
        let params = Number(req.params.id)
        let obj = {
            title : req.body.title,
            description : req.body.description,
            category : req.body.category,
            userId : req.userData.id
        }
        
        Task.update(obj,{where:{id:params}})
        .then(result=>{
            if(result[0]){
              res.status(200).json(obj)  
            }
            else{
             next({status: 404, msg: 'Data not found!'})  
            }
        })
        .catch(err=>{
            next({status: 501, msg: 'Internal server error!'}) 
        })
    }

    static delete(req,res,next){
        let params = req.params.id
        let task = null
        Task.findOne({where:{id:params}})
        .then(result=>{
            if(result){
            task = result;
            return Task.destroy({where:{id:params}})
            } else{
                next({status: 404, msg: 'Data not found!'})
            }
        })
        .then(data=>{
             res.status(200).json(task)  
        })
        .catch(err=>{
            next({status: 501, msg: 'Internal server error!'})
        })
    }
}

module.exports = TaskController