
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCartItem } from './shopping-cart-item';


export class ShoppingCartFirebase {
  private key: string; //id of shopping cart
  private payload: { 
    items: { [key: string]: ShoppingCartItem }
  };

  constructor({ key, payload, type }) {
    this.key=key;
    this.payload = payload;
  }

  get cartId() {
    return this.key
  }
  
  get items() {
    return this.payload.items;
  }

  get totalItemsNumber() {
    let count = 0;
    for(let itemId in this.items) {
      count+= this.items[itemId].quantity;
    }
    return count;
  }

  get totalCost() {
    if(!this.items) return 0

    let totalCost = 0;
    for(let itemId in this.items) {
      totalCost+=this.items[itemId].product.price * this. items[itemId].quantity
    }
    return totalCost;
  }

  get itemKeys() {
    if(!this.items) return [];

    return Object.keys(this.items);
  }

  getQuantity(productId: string) {
    if(!this.items) return 0;

    let itemInCart = this.items[productId]
    return itemInCart ? itemInCart.quantity : 0
  }
  
}