import { ShoppingCartService } from './../services/shopping-cart.service';
import { ShoppingCartFirebase } from '../models/shopping-cart-firebase';
import { ProductFirebase } from './../models/product-firebase';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: ProductFirebase
  @Input('shopping-cart') shoppingCart: ShoppingCartFirebase

  constructor(private cartService: ShoppingCartService) { }

  async addToCart() {
    this.cartService.addToCart(this.product);
  }

}
