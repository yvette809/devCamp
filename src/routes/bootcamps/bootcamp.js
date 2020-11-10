const express  = require ("express")
const BootcampModel = require("./bootcampSchema")
const bootcampRouter = express.Router()
const q2m = require("query-to-mongo")
const geocoder = require("../../utils/geocoder")
const bootcampModel = require("./bootcampSchema")


// get all bootcamps
// bootcampRouter.get("/", async(req,res,next)=>{
//     try {
//         const bootcamps = await BootcampModel.find()
//         res.status(200).json({success:true, count:bootcamps.length, data:bootcamps})
        
//     } catch (error) {
//        next(error)
        
//     }

// })

// get all bootcamps within radius
bootcampRouter.get("/radius/:zipcode/:distance", async(req,res,next)=>{
    try {
        // req.params is the url
       const {zipcode,distance} = req.params;
        // get lat/lng from geocoder
        const loc = await geocoder.geocode(zipcode)
        const lat = loc[0].latitude
        const long = loc[0].longitude

        // calc radius using radians
        // divide dist by radius of earth
        // Earth Radius = 3,963 mi/6,378km

        const radius = distance/3963
        const bootcamps= await BootcampModel.find({
            location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
        })
        res.status(200).json({
            success:true,
            count:bootcamps.length,
            data:bootcamps
        })
    } catch (error) {
       next(error)
        
    }

})

// get bootcamps with pagination
bootcampRouter.get('/', async(req,res,next)=>{
    try{
        const query = q2m(req.query)
        const bootcamps = await bootcampModel.find(query.criteria, query.options.fields)
        .skip(query.options.skip)
        .limit(query.options.limit)
        .sort(query.options.sort)

        res.send({
            data: bootcamps,
            total: bootcamps.length
        })

    }catch(error){
        next(error)
    }
   
})




// get single bootcamp
bootcampRouter.get("/:id", async(req,res,next)=>{
    try {
        const bootcamp = await BootcampModel.findById(req.params.id)
        if(!bootcamp){
            const error = new Error(`bootcamp with id ${req.params.id} not found`);
            error.httpStatusCode = 404;
            next(error);
        }
        res.status(200).json({success:true, data:bootcamp})
    } catch (error) {
       next(error)
    }

})


// update bootcamp
bootcampRouter.put("/:id", async(req,res,next)=>{
    try {
        const bootcamp = await BootcampModel.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
        if(!bootcamp){
            const error = new Error(`bootcamp with id ${req.params.id} not found`);
            error.httpStatusCode = 404;
            next(error);
        }else{
            res.status(200).json({success:true, data:bootcamp})
        }
    } catch (error) {
      next(error)
    }
    
})

// create bootcamp
bootcampRouter.post("/", async(req,res,next)=>{
    try {
     const bootcamp= await BootcampModel.create(req.body)
    res.status(201).json({success: true, data:bootcamp})
    } catch (error) {
       next(error)
    }
    
})

// delete bootcamp
bootcampRouter.delete("/:id", async(req,res,next)=>{
    try {
        const bootcamp= await BootcampModel.findByIdAndDelete(req.params.id)
        if(!bootcamp){
            const error = new Error(`bootcamp with id ${req.params.id} not found`);
            error.httpStatusCode = 404;
            next(error);
        }else{
            res.status(200).json({success:true, data:'bootcamp deleted'})
        }
    } catch (error) {
        res.status(400).json({success:false})
    }
})



module.exports=bootcampRouter