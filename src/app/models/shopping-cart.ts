import { ShoppingCartItem } from './shopping-cart-item';

export interface ShoppingCart {
  key: string //id of shopping cart
  payload: {
    items: ShoppingCartItem[]
  }
  type: string
}