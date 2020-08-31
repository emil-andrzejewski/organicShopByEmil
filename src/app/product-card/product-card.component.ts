import { ProductFirebase } from './../models/product-firebase';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: ProductFirebase

  constructor(
    private cartService: ShoppingCartService
  ) { }

  ngOnInit(): void {
  }
  
  addToCart(product) {
    this.cartService.addToCart(product)
  }

  getQuantityInCart(product) {
    return this.cartService.getQuantity(product)
  }

}
