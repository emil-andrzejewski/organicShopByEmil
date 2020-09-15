import { ProductService } from './../../services/product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/product';
import { MatSort } from '@angular/material/sort'
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  displayedColumns: string[] = ['title', 'price', 'category', 'edit'];
  products: MatTableDataSource<any>
  @ViewChild (MatSort,{static: true}) sort: MatSort
  @ViewChild (MatPaginator) paginator: MatPaginator
  
  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService.getAll().subscribe(products => {
      this.products = new MatTableDataSource;
      products.forEach(elem => {
        let p = elem.payload;
        p['$key'] = elem.key
        this.products.data.push(p);
      });
      this.products.sort = this.sort
      this.products.paginator = this.paginator
      // console.log('Loaded '+ this.products.data.length + ' clients');
    },
    error => console.log('Error: ' + error));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.products.filter = filterValue.trim().toLowerCase();
  }

}
