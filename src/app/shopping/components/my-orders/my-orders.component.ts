
import { switchMap } from 'rxjs/operators';
import { Component } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { AuthService } from 'shared/services/auth.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent  {

  orders$;
  
  constructor(
    private authService: AuthService,
    private orderService: OrderService) { 

    this.orders$ = authService.user$.pipe(switchMap(u => orderService.getOrdersByUser(u.uid)));
  }

}
