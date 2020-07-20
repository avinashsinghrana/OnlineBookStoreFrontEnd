import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from '../http.service';
import {Seller} from '../../model/seller.model';

@Injectable({
  providedIn: 'root'
})
export class SellerListService {

  sellerId: number;
  constructor(private httpService: HttpService) { }

  getAllsellerList(): Observable<Seller[]>{
    // @ts-ignore
    return this.httpService.get('http://localhost:8081/admin/getSellerList');
  }

  setSellerId(userId: any) {
    this.sellerId = userId;
  }
}
