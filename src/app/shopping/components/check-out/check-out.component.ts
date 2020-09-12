
import { Subscription, Observable } from 'rxjs';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit{

  cart$: Observable<ShoppingCart>;
  



  constructor(private cartService: ShoppingCartService){

  }

  async ngOnInit(){
  	this.cart$ = await this.cartService.getCart();
  	// this.cart$.subscribe((cart) => {
   //    console.log(cart)
   //  })
  	
  }
  

}
