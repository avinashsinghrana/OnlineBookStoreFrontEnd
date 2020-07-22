import {Injectable} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private httpService: HttpService) {
  }

  addToWishList(bookId: any, token: string): Observable<any> {
    return this.httpService.addedToWishList('http://localhost:8081/user/addToWishlist?bookId=' + bookId + '&token=' + token);
  }

  getBookOfWishList(token: string): Observable<any> {
    return this.httpService.getWishlistBooks('http://localhost:8081/user/getWishListBooks?token=' + token);
  }

  removeFromWL(bookId: any, token: string): Observable<any> {
    return this.httpService.removeFromWishList('http://localhost:8081/user/deleteFromWishlist?bookId=' + bookId + '&token=' + token);
  }

  addtoCartFromWL(bookId: any, token: string): Observable<any> {
    return this.httpService.addToCartFromWishList('http://localhost:8081/user/addFromWishlistToCart?bookId=' + bookId + '&token=' + token);
  }

  getIdFromWishList(): Observable<any> {
    return this.httpService.getIdFromWL('http://localhost:8081/user/wishListStatus?token=' + localStorage.getItem('token'));
  }
}
