import { Injectable } from '@angular/core';
import { productDetails } from '../shared/models/product';
import { sample_Product, sample_Tags } from '../ProductData';
import { Tag } from '../shared/models/tag';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FOODS_URL, FOOD_BY_SEARH_URL } from '../shared/constants/urls';
import { FOOD_TAGS_URL } from '../shared/constants/urls';
import { FOOD_BY_TAG_URL } from '../shared/constants/urls';
import { FOOD_BY_ID_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http:HttpClient) {}

  // -------GetAll Product-------------
  getall(): Observable<productDetails[]> {
    return this.http.get<productDetails[]>(FOODS_URL)
  }
  getAllFoodBySearchTerm(seachTerm: string) {
    return this.http.get<productDetails[]>(FOOD_BY_SEARH_URL + seachTerm)
  }

  // -------------GetAll by Tag--------------
  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(FOOD_TAGS_URL)
  }
  getAllProductBySearchTag(tag: string): Observable<productDetails[]> {
    return tag === 'All'
      ? this.getall()
      : this.http.get<productDetails[]>(FOOD_BY_TAG_URL + tag)
  }

  getFoodByid(foodId:string):Observable<productDetails>{
    return this.http.get<productDetails>(FOOD_BY_ID_URL + foodId)
  }
}
