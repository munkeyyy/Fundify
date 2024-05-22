import dotenv from "dotenv"
dotenv.config()
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import userRouter from "./Routers/user.router.js"
import sipRouter from "./Routers/bank.router.js"
const app= express()
const port=8000
app.use(express.json()); //body-parser (to read request body data)
app.use("/uploads", express.static("uploads"));
app.use(cors());



async function connectToDatabase() {
    try {
      await mongoose.connect(`mongodb+srv://khatrirohit198:${process.env.Mongo_PASS}@fundify.ivicwwt.mongodb.net/Fundify`);
      console.log("DB Connected!");
    } catch (error) {
      console.error("Error connecting to database:", error);
    }
  }
  
  // Call the async function to connect to the database
  connectToDatabase();


app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})

app.use("/users",userRouter)
app.use("/sips",sipRouter)