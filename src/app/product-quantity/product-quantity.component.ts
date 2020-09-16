import { Component, OnInit, Input } from '@angular/core';
import { ProductFirebase } from '../models/product-firebase';
import { ShoppingCartFirebase } from '../models/shopping-cart-firebase';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input('productId') productId: string
  @Input('shopping-cart') shoppingCart: ShoppingCartFirebase

  constructor(
    private cartService: ShoppingCartService
  ) { }

  async increment() {
    this.cartService.increment(this.productId)
  }

  async decrement() {
    this.cartService.decrement(this.productId)
  }

  getQuantity() {
    return this.shoppingCart.getQuantity(this.productId)
  }

}
