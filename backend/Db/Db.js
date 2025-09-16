import mongoose from "mongoose"

export function Db(){
    mongoose.connect(process.env.MONGO_URL).then(()=>console.log("database is connected")).catch(()=>{
        console.log("database is not connected")
    })
}