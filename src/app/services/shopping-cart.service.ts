import { ShoppingCart } from './../models/shopping-cart';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { ShoppingCartItem } from 'src/app/models/shopping-cart-item';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) { }

  private create(): firebase.database.ThenableReference {
    return this.db.list('/shopping-carts/').push({ creationDate: new Date().getTime() })
  }

  async getCart() {
    let cartId = await this.getOrCreateCartId()
    return this.db.object('/shopping-carts/' + cartId).snapshotChanges()
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId')
    if(cartId) return cartId 

    let result = await this.create()
    localStorage.setItem('cartId',result.key)
    return result.key
  }

  getItem(cartId, productId): AngularFireObject<ShoppingCartItem> {
    return this.db.object('/shopping-carts/'+ cartId + '/items/' + productId )
  }

  async updateCart(product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item = this.getItem(cartId,product.key)
    item.valueChanges().pipe(take(1)).subscribe(it=>{
      if(!it) item.set({ product: product.payload, quantity: 1})
      else item.update({ quantity: it.quantity + change})
    })
  }

  async addToCart(product) {
    this.updateCart(product,+1)
  }

  async takeFromCart(product) {
    this.updateCart(product,-1)
  }

  async getQuantity(product) {
    let cartId = await this.getOrCreateCartId()
    let item = this.getItem(cartId,product.key)
    item.valueChanges().pipe(take(1)).subscribe(it=>{
      return it.quantity
    })
  }

  


  async increment(product) {
    this.addToCart(product)
  }

}
