
import { ShoppingCartItem } from './shopping-cart-item';


export class ShoppingCartFirebase {
  key: string; //id of shopping cart
  payload: { 
    items: { [key: string]: ShoppingCartItem } 
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
    for(let itemId in items) {
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
    if(this.totalItemsNumber===0) return 0

    let cost = 0;
    this.items.forEach(item => {
      cost+= item.product.price * item.quantity;
    });
    return cost;
  }

  get itemKeys() {
    if(!this.payload.items) return [];

    return Object.keys(this.payload.items);
  }

  getQuantity(productId: string) {
    if(!this.payload.items) return 0;

    let itemInCart = this.payload.items[productId]
    return itemInCart ? itemInCart.quantity : 0
  }
  
}