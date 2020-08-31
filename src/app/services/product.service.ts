import { Observable } from 'rxjs';
import { Product } from './../models/product';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product: Product) {
    this.db.list('/products').push(product);
  }

  getAll(): Observable<SnapshotAction<Product>[]> {
    return this.db.list('/products').snapshotChanges() as Observable<SnapshotAction<Product>[]>
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
