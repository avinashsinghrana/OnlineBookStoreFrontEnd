import {Component, OnInit} from '@angular/core';
import {OrderconfirmationService} from '../../services/orderConfirmation/orderconfirmation.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent implements OnInit {

  constructor(private orderconfirmation: OrderconfirmationService) {
  }
  orderId: any;

  ngOnInit(): void {
    // this.getOrderId();
  }
  tranfOrderId(): any {
    return '#' + this.getOrderId();
  }

  getOrderId(){
    let orderId = '';
    this.orderconfirmation.fetchOrderId().subscribe(response => {
      localStorage.setItem('OrderId', response.toString());
      console.log(response);
      orderId = response;
    });
    return orderId;
  }
}
