import { Product } from 'src/app/models/product';
import { ProductService } from './../services/product.service';
import { CategoryService } from './../services/category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { take, switchMap } from 'rxjs/operators';
import { ActivationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  categories
  products: any[] = [] //: Product[]
  filteredProducts: any[]
  activeCategory;
  subs: Subscription[] = new Array;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.subs.push(this.categoryService.getAll().pipe(take(1)).subscribe(c => 
      this.categories = JSON.parse(JSON.stringify(c))
    ))

    this.subs.push(this.productService.getAll() //first get all products
      .pipe(switchMap(products=>{
        this.products = JSON.parse(JSON.stringify(products))    
        return route.queryParamMap
      })) // and then get queryParams from ActivatedRoute and make filtering
      .subscribe(params => {
        this.activeCategory = params.get('category')
        
        this.filteredProducts = this.activeCategory ?
          this.products.filter(p=> p.payload.category === this.activeCategory) :
          this.products
        })
      )
   }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subs.forEach(elem => {
      if(elem) elem.unsubscribe()
    });
  }

  setActiveCategory(category) {
    this.activeCategory=category
  }

  filterProducts(category): void {
    // this.filteredProducts = this.products.filter(p => p.payload.category===category)
  }

}
