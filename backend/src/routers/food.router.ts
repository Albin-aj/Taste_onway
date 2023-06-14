import { Router } from "express"
import { sample_Product, sample_Tags } from "../ProductData"
import AsyncHandler from "express-async-handler"
import { FoodModel } from "../models/food.model"
// import foodCon from "../controller/foodController"

const router = Router()

router.get('/seed',AsyncHandler(
    async (req,res)=>{
        const foodCount = await FoodModel.countDocuments()
        console.log(foodCount);
        if(foodCount > 0){
            res.send("Seed already done!")
            console.log('already done!');
            
            return
        }
        await FoodModel.create(sample_Product)
        res.send("Seed is done!")
        console.log("seed is done");
        
    }
))


router.get("/",AsyncHandler(
   async (req,res)=>{
        const foods = await FoodModel.find()
        res.send(foods)
    }
))
// router.get('/',foodCon)

router.get("/search/:searchTerm", AsyncHandler(
    async (req,res)=>{
        const searchRegex = new RegExp(req.params.searchTerm, 'i')
        const foods = await FoodModel.find({name:{ $regex:searchRegex }})
        res.send(foods)
    }
))

router.get('/tags',AsyncHandler(
    async (req,res)=>{
        const tags = await FoodModel.aggregate([
            { $unwind:'$tags' },
            {
                $group:{
                    _id:'$tags',
                    count: {$sum:1}
                }
            },
            {
                $project:{
                    _id:0,
                    name:'$_id',
                    count:'$count'
                }
            }
        ]).sort({count:-1})

        const all = {
            name:'All',
            count: await FoodModel.countDocuments()
        }

        tags.unshift(all)
        res.send(tags)
    }
))


router.get("/tag/:tagName",AsyncHandler(
    async (req,res)=>{
        const tagName = req.params.tagName
        const foods = await FoodModel.find({tags:tagName})
        res.send(foods)
    }
))

router.get("/:foodId", AsyncHandler(
    async (req,res)=>{
        const foodId = req.params.foodId
        const foods = await FoodModel.findById({_id:foodId})
        res.send(foods)
    }
))


export default router