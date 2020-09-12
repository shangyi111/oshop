import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
// import { Product } from './models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }


  create(product){
  	return this.db.list('/products').push(product);
  }
  getAll(){
  	return this.db.list('/products');
  }
  get(productId){
  	return this.db.object('/products/' + productId)
      .valueChanges()
      .pipe(take(1));
  }
  update(productId, product){
  	return this.db.object('/products/'+productId).update(product);
  }
  
  delete(productId){
  	return this.db.list('/products').remove(productId);
  }
}