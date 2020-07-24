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

  orderId: string;

  ngOnInit(): void {
    this.getOrderId();
  }

  tranfOrderId(): string {
    console.log('order Id', this.orderId);
    return '#' + this.orderId;
  }

  getOrderId() {
    this.orderconfirmation.fetchOrderId().subscribe(response => {
      console.log('response', response);
      this.orderId = response.imgUrl;
    });
  }
}
