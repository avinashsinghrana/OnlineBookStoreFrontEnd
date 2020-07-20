import {Injectable} from '@angular/core';
import {Subject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HttpService} from './http.service';
import {environment} from 'src/environments/environment';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartserviceService {
  // tslint:disable-next-line:variable-name
  private _autoRefresh$ = new Subject();
  private customerDetails = new Subject<any>();
  private setbugetTotal = new Subject<any>();

  get autoRefresh$() {
    return this._autoRefresh$;
  }

  constructor(private http: HttpClient, private httpservice: HttpService) {
  }

  addToBag(id: any, token: any): Observable<any> {
    console.log(id);
    return this.httpservice.addtoCart('http://localhost:8081/user/AddToCart?bookId=' + id + '&token=' + token)
      .pipe(
        tap(() => {
          this._autoRefresh$.next();
        })
      );
  }


  getCartList(): Observable<any> {
    return this.httpservice.get(
      `${environment.cartApiUrl}/${environment.cartList}`,
      {headers: new HttpHeaders().set('token', sessionStorage.token)}
    ).pipe(
      tap(() => {
        this._autoRefresh$.next();
      })
    );
  }

  updateOrderQuantity(order): Observable<any> {
    return this.httpservice
      .put(`${environment.cartApiUrl}/${environment.updateQuantity}`, order, {
        headers: new HttpHeaders().set('token', sessionStorage.token),
      })
      .pipe(
        tap(() => {
          this._autoRefresh$.next();
        })
      );
  }

  confirmOrder(order): Observable<any> {
    console.log(order);
    return this.httpservice
      .put(`${environment.cartApiUrl}/${environment.confirmOrder}`, order, {
        headers: new HttpHeaders().set('token', sessionStorage.token),
      })
      .pipe(
        tap(() => {
          this._autoRefresh$.next();
        })
      );
  }

  setCustomerDetails(message: any) {
    this.customerDetails.next({customer: message});
  }

  getCustomerDetails(): Observable<any> {
    return this.customerDetails.asObservable();
  }

  setBudgetTotal(message: any) {
    return this.setbugetTotal.next({total: message});
  }

  getBudgetTotal(): Observable<any> {
    return this.setbugetTotal.asObservable();
  }
}
