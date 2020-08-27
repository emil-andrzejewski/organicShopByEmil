import { Product } from 'src/app/models/product';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService as ProductService } from './../../services/product.service';
import { Subscription, Observable } from 'rxjs';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  productForm = this.fb.group({
    title: ['',Validators.required],
    price: ['',[Validators.min(0)]],
    category: ['',Validators.required],
    imageUrl: ['',Validators.required]
  });
  sub1: Subscription; 
  sub2: Subscription; 
  formControls = this.productForm.controls;
  categories;
  category;
  id;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // this.categories$ = categoryService.getAll();
    this.sub1 = categoryService.getAll().subscribe(x=> {
      this.categories = JSON.parse(JSON.stringify(x));
    })

    this.id = route.snapshot.paramMap.get('id')
    if(this.id) {
      this.sub2 = productService.get(this.id).subscribe(p => {
        this.productForm.setValue(p)
        // this.product = JSON.parse(JSON.stringify(p))
        this.category = this.formControls.category.value
      })
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if(this.sub1) this.sub1.unsubscribe()
    if(this.sub2) this.sub2.unsubscribe()
  }

  saveProduct() {
    if(this.id) { //if editing a product
      this.productService.update(this.id,this.productForm.value)
    }
    else {    // defining new product
      this.productService.create(this.productForm.value);
    }
    this.router.navigateByUrl('/admin/products');  
  }

  deleteProduct() {
    if(confirm('Are you sure?')) {
      if(this.sub2) this.sub2.unsubscribe()
      this.productService.remove(this.id)
      this.router.navigateByUrl('/admin/products')
    }
  }

  getCategory(id) {
    return this.categoryService.get(id) as Observable<Category>
  }

}
