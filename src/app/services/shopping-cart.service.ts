import { ProductFirebase } from './../models/product-firebase';
import { ShoppingCartFirebase } from '../models/shopping-cart-firebase';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { ShoppingCartItem } from 'src/app/models/shopping-cart-item';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCartFirebase>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).snapshotChanges().pipe(
      map(cart => {
        let newCart = new ShoppingCartFirebase(JSON.parse(JSON.stringify(cart)));
        return newCart;
      })
    )
  }

  async addToCart(product: ProductFirebase) {
    this.addItemToCart(product)
  }

  async increment(productId: string) {
    this.updateItemQuantity(productId, +1)
  }

  async decrement(productId: string) {
    this.updateItemQuantity(productId, -1)
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create(): firebase.database.ThenableReference {
    return this.db.list('/shopping-carts/').push({ creationDate: new Date().getTime() })
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId')
    if (cartId) return cartId

    let cart = await this.create()
    localStorage.setItem('cartId', cart.key)
    return cart.key
  }

  private getItem(cartId, productId): AngularFireObject<ShoppingCartItem> {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId)
  }

  private async addItemToCart(product: ProductFirebase) {
    let cartId = await this.getOrCreateCartId();
    let item = this.getItem(cartId, product.key)
    item.valueChanges().pipe(take(1)).subscribe(it => {
      if (!it) item.set(new ShoppingCartItem({ product: product.payload, quantity: 1 }));
    })
  }

  private async updateItemQuantity(productId: string, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item = this.getItem(cartId, productId)
    item.valueChanges().pipe(take(1)).subscribe(it => {
      let quantity = it.quantity + change;
      if (quantity === 0) item.remove();
      else item.update({ quantity: it.quantity + change })
    })
  }

}
