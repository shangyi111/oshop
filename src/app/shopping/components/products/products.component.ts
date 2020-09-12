
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { switchMap } from 'rxjs/operators';
import { Product } from 'shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'shared/services/product.service';
import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  products : Product[];
  filteredProducts: Product[];
  category: string;
  cart$: Observable<ShoppingCart>;
  

  constructor(
  	private route: ActivatedRoute,
  	private productService: ProductService,
    private cartService:ShoppingCartService
  	){
      
  		
			// subscribe((products: any[]) => {
   //    this.products = products.map( p => {
   //      const data = p.payload.val()
   //      data.key = p.key
   //      return data;
   //    });
   
  }

  async ngOnInit(){
    this.cart$ = await this.cartService.getCart();    
    this.populateProducts();
  }

  private populateProducts(){
    this.productService
       .getAll()
       .snapshotChanges()
       .pipe(switchMap((products: any[])=> {
          this.products = products.map((p) => {
            const data = p.payload.val();
            data.key = p.key;
            return data
          });
          return this.route.queryParamMap;
          })
       )
       .subscribe(params =>{
          this.category = params.get('category');
          this.applyFilter();
      })
          
  }

  private applyFilter(){
    this.filteredProducts=(this.category)?
    this.products.filter(p => p.category===this.category) :
    this.products;
  }
  

}
