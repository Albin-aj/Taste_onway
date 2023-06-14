import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchTerm:any = ''

  constructor( private route:Router, activatedroute:ActivatedRoute){
    activatedroute.params.subscribe(params=>{
      if(params.searchTerm)
      this.searchTerm = params['searchTerm']
    })
  }

  search(term:any){
    if(term)
    this.route.navigateByUrl('/search/'+term)
    else
    this.route.navigateByUrl('/')
  }


}
