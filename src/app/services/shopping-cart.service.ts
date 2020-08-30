import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    let cartId = localStorage.getItem('cartId')
    if(!cartId) 
      this.db.list('/shopping-carts/').push({ creationDate: new Date().getTime() }).then(
        result => {
          localStorage.setItem('cartId',result.key)

          this.db.list('/shopping-carts/'+result.key).push( {productId: product.key})
        }
      )
    else this.db.list('/shopping-carts/'+cartId).push({productId: product.key})      
  }

}
