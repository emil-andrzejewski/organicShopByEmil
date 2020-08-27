import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  constructor(private db: AngularFireDatabase) { }

  getAll()/* : Observable<Category[]> */ {
    return this.db.list('/categories').snapshotChanges() /*  as Observable<Category[]>; */
  }

  get(id) {
    return this.db.object('categories/'+id).valueChanges()
  }
}
