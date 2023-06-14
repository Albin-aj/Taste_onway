import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors' 
import foodRouter from './routers/food.router'
import userRouter from './routers/user.router'
import { dbConnect } from './configs/database.config'

dbConnect()

const port = process.env.PORT || 5000


const app = express()
app.use(express.json())

// app.use(cors());
// app.options('*', cors());

app.use(cors({
    credentials : true,
    origin:["http://localhost:4200"]
}))

app.use("/api/foods",foodRouter) 
// evide '/api/foods' use cheythaaal foodRouter.router.ts il url start cheyyan api/food kodukkenda
app.use('/api/users',userRouter)




app.listen(port,()=>{
  console.log("Website served on http://localhost:"+port)
})



 
