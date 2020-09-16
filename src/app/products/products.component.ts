import { ShoppingCartFirebase } from '../models/shopping-cart-firebase';
import { ProductFirebase } from './../models/product-firebase';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { ProductService } from './../services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: ProductFirebase[] = []
  filteredProducts: ProductFirebase[]
  activeCategoryId;
  subs: Subscription[] = new Array;
  cart$: Observable<ShoppingCartFirebase>;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: ShoppingCartService
  ) { }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    this.populateProducts();
  }

  ngOnDestroy(): void {
    this.subs.forEach(elem => {
      if (elem) elem.unsubscribe()
    });
  }

  private populateProducts() {
    this.subs.push(this.productService.getAll() //first get all products
      .pipe(switchMap(products => {
        this.products = products;
        return this.route.queryParamMap
      })) // and then get queryParams from ActivatedRoute and make filtering
      .subscribe(params => {
        this.activeCategoryId = params.get('categoryId')
        this.applyFilter();
      })
    )
  }

  private applyFilter() {
    this.filteredProducts = this.activeCategoryId ?
      this.products.filter(p => p.payload.category === this.activeCategoryId) :
      this.products
  }


}
