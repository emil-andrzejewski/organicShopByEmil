import { Observable } from 'rxjs';
import { Product } from './../models/product';
import { AngularFireDatabase } from '@angular/fire/database';
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

  getAll() { //: Observable<Product[]> {
    return this.db.list('products').snapshotChanges()
  }
}
