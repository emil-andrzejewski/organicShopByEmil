import { ShoppingCartItem } from './../models/shopping-cart-item';
import { Observable, Subscription } from 'rxjs';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartFirebase } from '../models/shopping-cart-firebase';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
items: {[key: string] : ShoppingCartItem} ; //: ShoppingCartItem[] = [];
displayedColumns: string[] = ['productName', 'quantity', 'unitPrice', 'price'];
cart: ShoppingCartFirebase;
subs: Subscription[] = [];

  constructor(private cartService: ShoppingCartService) { }

  async ngOnInit() {
    this.subs.push((await this.cartService.getCart()).subscribe(cart => {
      this.cart = cart;
      this.items = cart.payload.items;
    }))
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  ngOnDestroy(): void {
    this.subs.forEach(elem => {
      if(elem) elem.unsubscribe()
    });
  }
}
