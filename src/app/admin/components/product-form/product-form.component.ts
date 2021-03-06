import { ProductService } from 'shared/services/product.service';
import { CategoryService } from 'shared/services/category.service';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {

   categories$;
   product: any = {};
   id;

  constructor(
  	private router: Router,
  	private route : ActivatedRoute,
  	private categoryService: CategoryService, 
  	private productService: ProductService) {

  	this.categories$ = categoryService.getAll();

  	this.id = this.route.snapshot.paramMap.get('id');
  	if(this.id) this.productService.get(this.id).subscribe(p=>this.product=p);
  }
  
  save(product){
  	if (this.id){
      this.productService.update(this.id, product);
  	}
    else {
      this.productService.create(product);
    }
  	
  	this.router.navigate(['/admin/products']);
  }
  
  delete(){
  	if(!confirm('Are you sure deleting this product?')) return;

	this.productService.delete(this.id);
	this.router.navigate(['/admin/products']);
  	
  }
 

}
