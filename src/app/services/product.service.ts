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
  }

  get(productId: string): Observable<Product> {
    return this.db.object('/products/' + productId).valueChanges() as Observable<Product>
  }

  update(productId: string, product: Product): Promise<void> {
    return this.db.object('/products/' + productId).update(product)
  }

  remove(productId: string): Promise<void> {
    return this.db.object('/products/' + productId).remove()
  }
}
