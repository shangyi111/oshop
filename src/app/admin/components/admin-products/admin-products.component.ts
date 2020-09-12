import { ProductService } from 'shared/services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'shared/models/product';
import { DataTableResource } from 'angular7-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products:Product[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;

  constructor(private productService: ProductService) { 
  	this.subscription = this.productService.getAll()
  	.snapshotChanges()
  	.subscribe((products: any[]) => {
      this.products = products.map( p => {
        const data = p.payload.val()
        data.key = p.key
        return data;
      });

      this.initializeTable(this.products);
    })

  	// this.products.subscribe((p) => {
  	// 	console.log(p);
  	// });
  }

  private initializeTable(products :Product[]){
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({offset:0})
        .then(items => this.items = items);
    this.tableResource.count()
        .then(count => this.itemCount = count);
  }
  reloadItems(params){
    if(!this.tableResource) return
    this.tableResource.query(params)
        .then(items => this.items = items);
  }

  filter(query:string){
  	let filteredProducts = (query)?
  		this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : 
  		this.products;
    this.initializeTable(filteredProducts)
  }
  ngOnDestroy(){
  	this.subscription.unsubscribe();
  }
  ngOnInit(): void {
  }

}
