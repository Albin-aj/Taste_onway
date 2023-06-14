import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { productDetails } from '../shared/models/product';
import { CartItem } from '../shared/models/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart:Cart = this.getCartFromLocalStorage( )
  private cartSubject:BehaviorSubject<Cart> = new BehaviorSubject(this.cart)

  constructor() { }


  addToCart(food:productDetails):void{
    let cartItem = this.cart.items.find(item=>item.food.id === food.id)
    // console.log(cartItem);
    if(cartItem) return
    this.cart.items.push(new CartItem(food))

    this.setCartFromLocalStorage()
  }

  removeFromCart(foodId:string){
    this.cart.items = this.cart.items.filter(item=> item.food.id != foodId)
    this.setCartFromLocalStorage()
  }

  changeQuantity(foodId:string,quantity:number){
     let cartItem = this.cart.items.find(item=>item.food.id === foodId)
     if(!cartItem) return
     cartItem.quantity = quantity
     cartItem.Price = quantity*cartItem.food.price
     this.setCartFromLocalStorage()
  }

  clearCart(){
    this.cart = new Cart()
    this.setCartFromLocalStorage()
  }

  getCartObservable():Observable<Cart>{
      return this.cartSubject.asObservable()
  }

  private setCartFromLocalStorage(){
    this.cart.totalPrice = this.cart.items.reduce((preSum, currentItem)=>preSum + currentItem.Price, 0)
    this.cart.totalCount = this.cart.items.reduce((preCount, currentCount)=>preCount + currentCount.quantity, 0)


    const cartJson = JSON.stringify(this.cart)
    localStorage.setItem('Cart', cartJson)
    this.cartSubject.next(this.cart)
  }

  private getCartFromLocalStorage():Cart{
    const cartJson = localStorage.getItem('Cart')
    return cartJson? JSON.parse(cartJson):new Cart()
  }
}
