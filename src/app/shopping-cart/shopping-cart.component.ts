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
items: ShoppingCartItem[] = []
displayedColumns: string[] = ['productName', 'quantity', 'unitPrice', 'price'];
cart$: Observable<ShoppingCartFirebase>
subs: Subscription[] = new Array;

  constructor(private cartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    this.subs.push(this.cart$.subscribe(cart => {
      this.items = cart.items;
    }))
  }

  getTotalCost(): number {
    let totalCost = 0;
    this.subs.push(this.cart$.subscribe(cart => totalCost = cart.totalCost));
    return totalCost
  }

  clearCart(): void {

  }

  ngOnDestroy(): void {
    this.subs.forEach(elem => {
      if(elem) elem.unsubscribe()
    });
  }
}
