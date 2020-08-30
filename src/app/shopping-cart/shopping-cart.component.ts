import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
items: any[] = []
displayedColumns: string[] = ['productName', 'quantity', 'unitPrice', 'price'];

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit(): void {
  }

  getTotalCost(): number {
    if(this.items.length===0) return 0

    //else count totalprice
  }

  clearCart(): void {

  }
}
