import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { user } from 'src/app/shared/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  totalCount!:number
  user!:user

  constructor(private cartService:CartService, private userservice:UserService){
    cartService.getCartObservable().subscribe(newCart=>{
      this.totalCount = newCart.items.length

      userservice.userObservable.subscribe(val=>{
        this.user = val
      })
    })
  }

  logOut(){
    console.log("hiiiii");
    this.userservice.logout()
  }

  get isAuth(){
    return this.user.token
  }

}
