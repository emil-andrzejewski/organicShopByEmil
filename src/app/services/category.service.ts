import { Category } from './../models/category';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll(): Observable<Category[]> {
    return this.db.list('/categories').valueChanges() as Observable<Category[]>;
  }
}
