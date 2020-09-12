import { Product } from './../models/product';
import { ShoppingCart}  from './../models/shopping-cart';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db:AngularFireDatabase) { }


  

  async getCart():Promise<Observable<ShoppingCart>>{
  	let cartId = await this.getOrCreateCartId();
  	return this.db.object('/shopping-carts/' + cartId).snapshotChanges()
      .pipe(map(x =>  new ShoppingCart(x.payload.exportVal().items)));
  }
  async addToCart(product:Product){
    this.updateItem(product,1);
  }
  async removeFromCart(product:Product){
    this.updateItem(product,-1);
  }

  async clearCart(){
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId +'/items').remove();
  }

  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }

  private getItem(cartId:string, productId:string){
  	return this.db.object('/shopping-carts/'+cartId+'/items/'+productId);
  }
  private async getOrCreateCartId(): Promise<string>{
  	let cartId= localStorage.getItem('cartId');
  	if(cartId) return cartId;
 
  	let result = await this.create();
  	localStorage.setItem('cartId',result.key);
  	return result.key;
  	
  }

  

  private async updateItem(product:Product,change:number){
  	let cartId = await this.getOrCreateCartId();
  	let item$ = this.getItem(cartId, product.key);
  	item$
  		.valueChanges()
  		.pipe(take(1))
  		.subscribe((item: any) =>{
  			// item$.update({product:product,quantity:(item.quantity||0) +1})

	  		if(item) {
	  			item$.update({quantity:item.quantity + change});
	  			if(item.quantity===0) item$.remove();
	  		}else {
	  			item$.set({
            title:product.title,
            imageUrl:product.imageUrl,
            price: product.price,
            quantity :1})
	  		};
  		})
  }
}
