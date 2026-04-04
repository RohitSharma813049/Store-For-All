import express from "express";
import { configDotenv } from "dotenv";

configDotenv()

const app = express()


app.use(express.json())

app.get("/",(req,res)=>{
    res.send('Hello World')
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port :- http://localhost${process.env.PORT}`);
})