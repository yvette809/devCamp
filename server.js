const express = require ("express")
const app = express()
const cors = require ("cors")
const dotenv = require("dotenv")
const mongoose = require ("mongoose")
const logger = require ("./src/middleware/logger")
const morgan = require("morgan")
const {
  notFoundHandler,
  badRequestHandler,
  genericErrorHandler,
} = require("./src/middleware/error");
const bootcampRouter = require("./src/routes/bootcamps/bootcamp")

dotenv.config()

app.use(cors())
app.use(express.json())
// app.use(logger)

// Development logging middleware
if(process.env.NODE_ENV==='development'){
  app.use(morgan('dev'))
}

// routes
app.use("/api/v1/bootcamps", bootcampRouter)

//error handlers
// Error handler middleware
app.use(badRequestHandler);
app.use(notFoundHandler);
app.use(genericErrorHandler);

const port = process.env.PORT || 4020

mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    app.listen(port, () => {
      console.log(`server running in ${process.env.NODE_ENV} mode on port ${port}`);
    })
  )
  .catch((error) => console.log(error));
