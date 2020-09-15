import { ProductFirebase } from './../models/product-firebase';
import { Observable } from 'rxjs';
import { Product } from './../models/product';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product: Product) {
    this.db.list('/products').push(product);
  }

  getAll(): Observable<ProductFirebase[]> {
    return this.db.list('/products').snapshotChanges().pipe(map(
      products => JSON.parse(JSON.stringify(products))
    ))
    
    //as Observable<SnapshotAction<Product>[]>
  }

  get(productId) {
    return this.db.object('/products/'+productId).valueChanges()
  }

  update(productId,product) {
    return this.db.object('/products/'+productId).update(product)
  }

  remove(productId) {
    return this.db.object('/products/'+productId).remove()
  }
}
