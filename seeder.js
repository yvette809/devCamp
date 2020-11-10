const fs = require("fs")
const mongoose = require ("mongoose")
const dotenv = require ("dotenv")


// load env vars
dotenv.config({path:"./src/env"})

// load models
const BootcampModel = require ("./src/routes/bootcamps/bootcampSchema")

//connect to DB
mongoose
  .connect('mongodb+srv://evebabe:ub021299@cluster0.brjic.mongodb.net/test', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  // Read JSON files
  const bootcamps = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
  );

  //import in to DB
  const importData = async()=>{
      try {
          await BootcampModel.create(bootcamps)
          console.log("Data imported...")
          process.exit()
          
      } catch (err) {
          console.error(err)
      }
  }

  //delete data
  const deleteData = async () => {
    try {
      await BootcampModel.deleteMany();
      
      console.log('Data Destroyed...');
      process.exit();
    } catch (err) {
      console.error(err);
    }
  };

  if(process.argv[2]=== '-i'){
      importData()

  }else if(process.argv[2]==='-d'){
      deleteData()
  }
  