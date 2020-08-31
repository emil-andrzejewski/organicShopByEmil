import { CategoryService } from './../../services/category.service';
import { CategoryFirebase } from './../../models/category-firebase';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { take } from 'rxjs/operators';
 
@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit, OnDestroy {
  subs: Subscription[] = new Array
  categories: CategoryFirebase[];
  @Input('categoryId') activeCategoryId;

  constructor(
    private categoryService: CategoryService
  ) {
    this.categoryService.getAll().pipe(take(1)).subscribe(c => {
      this.categories = JSON.parse(JSON.stringify(c))
    })
  }

  ngOnInit(): void {
  }
  
  ngOnDestroy() {
    this.subs.forEach(elem => {
      if(elem) elem.unsubscribe()
    });
  }

  setActiveCategoryId(category: CategoryFirebase) {
    this.activeCategoryId = category ? category.key : null
  }

}
