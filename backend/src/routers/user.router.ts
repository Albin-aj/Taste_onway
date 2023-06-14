import { Router } from "express"
import jwt from 'jsonwebtoken'
import { sample_users } from "../ProductData"
import AsyncHandler from "express-async-handler"
import { User, UserModel } from "../models/user.model"
import bcrypt from 'bcryptjs'

const router = Router()

router.get('/seed',AsyncHandler(
   async (req,res)=>{
        const userCount = await UserModel.countDocuments()
        if(userCount > 0 ){
        await res.send('Seed already done')
        return
        }
        await UserModel.create(sample_users)
        res.send('Seed is done')
    }
))

router.post("/login",AsyncHandler(
    async (req,res)=>{
        const { email, password } = req.body
        const user = await UserModel.findOne({email, password})
        if(user){
        res.send(generateTokenResponse(user))
        }
        else{
            res.status(400).send('Username or Password is invalid!')
        }
    }
))


router.post("/register",AsyncHandler(
    async (req,res)=>{
        const { name,email,password,address } = req.body
        console.log(req.body);
        const user = await UserModel.findOne({email})
        if(user){
            res.status(400).send("User already exist! Please login")
            return
        }
        
        const encryptedPassword = await bcrypt.hash(password,10)
        const newUser:User  = {
            id:'',
            name,
            email:email.toLowerCase(),
            password:encryptedPassword,
            address,
            isAdmin:false
        }

       const dbUser = await UserModel.create(newUser)
       res.send(generateTokenResponse(dbUser))
    }
))


const generateTokenResponse = (user:any)=>{
    const token = jwt.sign({
        email:user.email, password:user.password
    },"randomText",{expiresIn:'1m'})

    user.token = token
    return user
}                                       

export default router
