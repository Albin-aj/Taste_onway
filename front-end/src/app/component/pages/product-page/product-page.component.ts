import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { productDetails } from 'src/app/shared/models/product';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent {

  food!: productDetails;
  starating?:number


  constructor(ActivatedRoute:ActivatedRoute,foodService:ProductService, private cartService:CartService,
    private router:Router){

    ActivatedRoute.params.subscribe(params=>{
      if(params.id)
      foodService.getFoodByid(params.id).subscribe(serverFood=>{
        this.food = serverFood
        // console.log(params.id);
        console.log(serverFood);

      })
    //  this.starating = this.food?.stars
    })
  }

  addToCart(){
    this.cartService.addToCart(this.food)
    this.router.navigateByUrl('/cart-page')
  }

}
