import { ProductFirebase } from './../models/product-firebase';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { ProductService } from './../services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnDestroy {

  products: ProductFirebase[] = [] //: Product[]
  filteredProducts: ProductFirebase[]
  activeCategoryId;
  subs: Subscription[] = new Array;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: ShoppingCartService
  ) {
    this.subs.push(this.productService.getAll() //first get all products
      .pipe(switchMap(products=>{
        this.products = JSON.parse(JSON.stringify(products))    
        return route.queryParamMap
      })) // and then get queryParams from ActivatedRoute and make filtering
      .subscribe(params => {
        this.activeCategoryId = params.get('categoryId')

        this.filteredProducts = this.activeCategoryId ? 
          this.products.filter(p=> p.payload.category === this.activeCategoryId) :
          this.products
      })
    )
   }

  ngOnDestroy(): void {
    this.subs.forEach(elem => {
      if(elem) elem.unsubscribe()
    });
  }

  filterProducts(category): void {
    // this.filteredProducts = this.products.filter(p => p.payload.category===category)
  }


}
