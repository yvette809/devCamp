const express  = require ("express")
const BootcampModel = require("./bootcampSchema")
const bootcampRouter = express.Router()
const bootcampModel = require("./bootcampSchema")


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

// create bootcamp
bootcampRouter.post("/", async(req,res,next)=>{
    try {
     const bootcamp= await BootcampModel.create(req.body)
    res.status(201).json({success: true, data:bootcamp})
    } catch (error) {
        res.status(400).json({success:false})
    }
    
})



module.exports=bootcampRouter