import { ShoppingCartItem } from 'src/app/models/shopping-cart-item';

export class ShoppingCartFirebase {
  items: { [key: string]: ShoppingCartItem } = {};

  constructor(private cart: { key: string, payload: { items: { [key: string]: ShoppingCartItem } } }) {
    if (cart.payload) {
      let itemMap = cart.payload.items;
      for (let itemKey in itemMap) {
        this.items[itemKey] = new ShoppingCartItem({ ...itemMap[itemKey] });
      }
    }
  }

  get cartId() {
    return this.cart.key;
  }

  get totalItemsNumber() {
    let count = 0;
    for (let itemId in this.items) {
      count += this.items[itemId].quantity;
    }
    return count;
  }

  get totalCost() {
    if (!this.items) return 0

    let totalCost = 0;
    for (let itemId in this.items) {
      totalCost += this.items[itemId].totalPrice;
    }
    return totalCost;
  }

  get itemKeys() {
    if (!this.items) return [];

    return Object.keys(this.items);
  }

  getQuantity(productId: string) {
    if (!this.items) return 0;

    let itemInCart = this.items[productId]
    return itemInCart ? itemInCart.quantity : 0
  }

}