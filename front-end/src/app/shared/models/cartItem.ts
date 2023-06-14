import { productDetails } from "./product"

export class CartItem{
  constructor(public food:productDetails){}
  quantity:number = 1
  Price:number = this.food.price
}
