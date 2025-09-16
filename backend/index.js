import dotenv from "dotenv"
dotenv.config()
import cors from "cors"
import express from "express"
import { Db } from "./Db/Db.js"
import { adminRoute } from "./Routes/admin.route.js"
import { authRoute } from "./Routes/auth.route.js"
import cookieParser from "cookie-parser"
import { userRoute } from "./Routes/user.route.js"
import { storeOwnerRoute } from "./Routes/storeOwner.route.js"

const app=express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }));


authRoute(app)
adminRoute(app)
userRoute(app)
storeOwnerRoute(app)

const PORT=process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`server is connected on ${PORT}`)
    Db()
})

