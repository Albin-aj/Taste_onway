import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { productDetails } from 'src/app/shared/models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  foods: productDetails[] = [];

  constructor(private service: ProductService, Activatedroute: ActivatedRoute) {
    let foodosbservable:Observable<productDetails[]>
    Activatedroute.params.subscribe((params) => {
      const key = params['searchTerm'];
      if (key) {
        foodosbservable = this.service.getAllFoodBySearchTerm(key);
      } else if (params.tags) {
        foodosbservable = this.service.getAllProductBySearchTag(params.tags);
      } else foodosbservable = this.service.getall();

      foodosbservable.subscribe(serverFood=>{
        this.foods = serverFood
      })
    });

    // this.foods= this.route.params.pipe(switchMap(params=>this.service.getAllFoodBySearchTerm(params["searchTerm"])))
    // this.foods.subscribe(console.log)
  }
}
