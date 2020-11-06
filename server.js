const express = require ("express")
const server = express()
const cors = require ("cors")
const dotenv = require("dotenv")

dotenv.config()

const port = process.env.PORT || 4020
server.listen(port, ()=>{
    console.log(`server running on port ${port}`)
})