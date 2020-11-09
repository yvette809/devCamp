const express  = require ("express")
const bootcampRouter = express.Router()


// get all bootcamps
bootcampRouter.get("/", async(req,res,next)=>{
    res.send("hello")

})


// get single bootcamp
bootcampRouter.get("/:id", async(req,res,next)=>{

})


// update bootcamp
bootcampRouter.put("/:id", async(req,res,next)=>{

})



module.exports=bootcampRouter