import {Injectable} from '@angular/core';
import {HttpService} from '../http.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  constructor(private httpService: HttpService) {
  }


  getAllBookCart(token: string): Observable<any> {
    return this.httpService.getBooksCart('http://localhost:8081/user/getAllFromCart?token=' + token);
  }

  addBooks(bookId: number, token: string): Observable<any> {
    return this.httpService.foo('http://localhost:8081/user/addMoreItems?bookId=' + bookId + '&token=' + token);
  }

  removeItem(bookId: number, token: string): Observable<any> {
    return this.httpService.removeCart('http://localhost:8081/user/removeFromCart?bookId=' + bookId + '&token=' + token);
  }

  removeBookFromCart(bookId: number, token: string): Observable<any> {
    return this.httpService.removeAllItemsCart('http://localhost:8081/user/removeBookFromCart?bookId=' + bookId + '&token=' + token);
  }

  removeAll(token: any, item: any): Observable<any> {
    return this.httpService.clearCart('http://localhost:8081/user/removeAll?token=' + token + '&id=' + item);
  }

  getIdFromCartList(): Observable<any> {
    return this.httpService.getIdFromCL('http://localhost:8081/user/cartListStatus?token=' + localStorage.getItem('token'));
  }
}
