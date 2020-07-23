import {Injectable} from '@angular/core';
import {HttpService} from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class OrderconfirmationService {

  constructor(private httpService: HttpService) {
  }

  fetchOrderId(): any {
    return this.httpService.getOrderId('http://localhost:8081/user/orderId');
  }
}
