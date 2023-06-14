import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Tag } from 'src/app/shared/models/tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent {
tags!:Tag[];
constructor(private service:ProductService){
  this.service.getAllTags().subscribe(serverTags=>{
    this.tags = serverTags
  })
}

}
