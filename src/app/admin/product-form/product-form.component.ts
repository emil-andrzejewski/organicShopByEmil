import { Router } from '@angular/router';
import { Product } from './../../models/product';
import { ProductService as ProductService } from './../../services/product.service';
import { Subscription, Observable } from 'rxjs';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  newProductForm = this.fb.group({
    title: ['',],
    price: ['',[Validators.min(0)]],
    category: [''],
    imageUrl: ['']
  });
  categories$: Observable<Category[]>  //: Category[]; //list of product categories
  sub: Subscription; 
  formControls = this.newProductForm.controls;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router
  ) {
    this.categories$ = categoryService.getAll();
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }

  saveProduct() {
    let newProduct: Product = this.newProductForm.value;
    this.productService.create(newProduct);
    this.router.navigateByUrl('/admin/products');
  }

  priceErrorInfo() {
    let errorInfo='';
    if(this.formControls.price.errors.required) {
      errorInfo+='Price is required. '
    }
    if(this.formControls.price.errors.min) {
      errorInfo+='Price must be higher than 0. '
    }   
    return errorInfo;
  }

}
