import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db:AngularFireDatabase,
  			  private cartService: ShoppingCartService) { }
  
  async placeOrder(order){

  	let result = await this.db.list('/order').push(order);
  	this.cartService.clearCart();
  	return result;
  }

  getOrders() { 
  	console.log(this.db.list('/order'))
    return this.db.list('/order').valueChanges();

  }

  getOrdersByUser(userId: string) {
    return this.db.list('/order',query => query.orderByChild('userId').equalTo(userId)
    // 	, {
    //   query: {
    //     orderByChild: 'userId',
    //     equalTo: userId        
    //   }
    // }
    ).valueChanges();
  }
}
