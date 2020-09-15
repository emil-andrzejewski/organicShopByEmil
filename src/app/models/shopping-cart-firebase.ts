
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCartItem } from './shopping-cart-item';


export class ShoppingCartFirebase {
  key: string; //id of shopping cart
  payload: { 
    items: { [key: string]: ShoppingCartItem }
    // itemsMap: ShoppingCartItem[] 
  };
  type: string;

  constructor({ key, payload, type }) {
    this.key=key;
    this.payload = payload;
    this.type = type;
  }

  get totalItemsNumber() {
    let count = 0;
    let items = this.payload.items;
    for(let itemId in this.payload.items) {
      count+= items[itemId].quantity;
    }
    return count;
  }

  get items() {
    let items: ShoppingCartItem[] = [];
    for(let itemId in this.payload.items) {
      items.push(this.payload.items[itemId])
    }
    return items;
  }

  get totalCost() {
    if(this.items.length===0) return 0

    let totalCost = 0;
    this.items.forEach(item => {
      totalCost+= item.product.price * item.quantity;
    });

    return totalCost;
  }
  
}