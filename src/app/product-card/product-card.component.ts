import { ShoppingCartFirebase } from '../models/shopping-cart-firebase';
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
  @Input('shopping-cart') shoppingCart: ShoppingCartFirebase

  constructor(
    private cartService: ShoppingCartService
  ) { }

  ngOnInit(): void {
  }

  async addToCart() {
    this.cartService.addToCart(this.product)
  }

  async takeFromCart() {
    this.cartService.takeFromCart(this.product)
  }

  getQuantity() {
    if (!this.shoppingCart || !this.shoppingCart.payload.items) return 0

    let itemInCart = this.shoppingCart.payload.items[this.product.key]
    return itemInCart ? itemInCart.quantity : 0
  }

}
