import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {HttpService} from './../services/http.service';
import {environment} from 'src/environments/environment';
import {SellerListComponent} from '../components/seller-list/seller-list.component';
import {SellerListService} from './sellerList/seller-list.service';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  private addBookApi = 'sellers/addBook';
  private updateBookApi = '/sellers/updateBook';
  private deleteBookApi = '/sellers/deleteBook';
  private displayBookApi = '/sellers/getUnverifiedBooks';
  private uploadBookProfileApi = 'users/uploadImage';
  private approveBookApi = '/admin/bookVerification';
  private displayAllBookApi = '/admin/getBooksForVerification';
  private getBookApi = '/user/getallBooks';

  constructor(private http: HttpClient, private service: HttpService,
              private sellerListService: SellerListService,
  ) {
  }

  addBook(body: any, token: any): Observable<any> {
    return this.service.postBook(body, token);
  }

  /* addBook(book: any): Observable<any> {
     return this.http.post(environment.baseUrl + this.addBookApi, book, {
       headers: new HttpHeaders().set('token', localStorage.getItem('stoken')),
     });
   }*/

  displayBooks(): Observable<any> {
    return this.http.get(environment.baseUrl + this.displayBookApi, {
      headers: new HttpHeaders().set('token', localStorage.getItem('token')),
    });
  }

  getBooks(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.get(environment.baseUrl + this.getBookApi, httpOptions);
  }

  displayAllBooks(): Observable<any> {
    return this.http.get(environment.baseUrl + this.displayAllBookApi, {
      headers: new HttpHeaders().set('token', localStorage.getItem('token')),
    });
  }

  deleteBooks(bookId: any, token: any): Observable<any> {
    return this.http.delete('http://localhost:8081/sellers/DeleteBook?bookId=' + bookId + '&token=' + token,
      {
        headers: new HttpHeaders().set('token', localStorage.getItem('token'))
      });
  }

  uploadBookImage(file: FormData, isProfile: string): Observable<any> {
    return this.http.post(
      environment.baseUrl + this.uploadBookProfileApi,
      file,
      {
        headers: new HttpHeaders().set('token', localStorage.getItem('token')),
        params: new HttpParams().set('isProfile', isProfile),
      }
    );
  }

  updateBook(body: any, bookId: any, token: any): Observable<any> {
    return this.http.put(
      'http://localhost:8081/sellers/updateBook?bookId=' + bookId + '&token=' + token, body,
      {
        headers: new HttpHeaders().set('token', localStorage.getItem('token')),
      }
    );
  }

  onApprove(bookId: any, sellerId: any, token): Observable<any> {
    // @ts-ignore
    return this.http.put(
      'http://localhost:8081/admin/bookVerification/' + sellerId + '/' + bookId + '/' + token);
  }

  getAllBooksOfAdmin() {
    console.log('sellerlist value in seller service', this.sellerListService.sellerId);
    return this.http.get('http://localhost:8081/admin/getBooksForVerification?sellerId=' + localStorage.getItem('sellerListId'));

  }

  disApproveBook(bookId: any, sellerId: any, token) {

    // @ts-ignore
    return this.http.put('http://localhost:8081/admin/bookDisApprove/' + sellerId + '/' + bookId + '/' + token);
  }

  applyForApproval(bookId: any) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put('http://localhost:8081/sellers/applyForApproval?bookId=' + bookId + '&token=' + localStorage.getItem('token'), httpOptions);
  }
}
