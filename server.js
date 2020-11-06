const express = require ("express")
const server = express()
const cors = require ("cors")
const dotenv = require("dotenv")
const mongoose = require ("mongoose")

dotenv.config()

const port = process.env.PORT || 4020

mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    server.listen(port, () => {
      console.log(`server running on port ${port}`);
    })
  )
  .catch((error) => console.log(error));
