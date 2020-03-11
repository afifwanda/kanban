const { Task } = require('../models/index.js')

function authorization(req,res,next){
    Task.findOne({where:{id : req.params.id}})
    .then(result=>{
        if(result){
            if(Number(result.userId) === Number(req.userData.id)){
                next()
            } else{
                next({status: 401, msg: 'you are not authorized'})
              }  
        } else{
            next({status: 404, msg: 'data not found!'})
          }
        
    })
    .catch(err=>{
        next({status: 500, msg: 'Internal server error'})
    })
}

module.exports = authorization