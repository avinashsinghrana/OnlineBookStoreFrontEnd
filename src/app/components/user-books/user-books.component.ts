import {Component, OnInit} from '@angular/core';
import {SellerService} from '../../services/seller.service';
import {MessageService} from '../../services/message.service';
import {MatSnackBar, MatDialog} from '@angular/material';
import {UpdateBookComponent} from '../update-book/update-book.component';
import {Book} from 'src/app/models/book.model';
import {CartServiceService} from 'src/app/services/cart-service/cart-service.service';
import {CartserviceService} from 'src/app/services/cartservice.service';
import {WishlistComponent} from '../wishlist/wishlist.component';
import {WishlistService} from '../wishListservice/wishlist.service';
import {BookserviceService} from '../../services/bookservice/bookservice.service';
import {coerceNumberProperty} from '@angular/cdk/coercion';

@Component({
  selector: 'app-user-books',
  templateUrl: './user-books.component.html',
  styleUrls: ['./user-books.component.scss'],
})
export class UserBooksComponent implements OnInit {
  books = [];
  book: Book[];
  searchTerm: string;
  message: string;
  size: any;
  sortTerm: string;
  add: false;
  wishValue: any = [];
  toggle = true;
  item = localStorage.getItem('cartItem');
  page = 1;
  cartValue: any = [];
  token: string;
  cartObjects = [];
  wishObjects: any = [];
  private wishItem: string;

  constructor(
    private vendorService: SellerService,
    private messageService: MessageService,
    private snackBar: MatSnackBar,
    private cartServiceService: CartServiceService,
    private cartServices: CartserviceService,
    private data: MessageService,
    private dialog: MatDialog,
    private wishlistService: WishlistService,
    private bookService: BookserviceService
  ) {

  }

  ngOnInit() {
    this.updateStatus();
    this.sortTerm = 'none';
    // this.data.changeItem(this.item);
    this.item = localStorage.getItem('cartItem');
    this.wishItem = localStorage.getItem('wishItem');
    this.bookService.getBookList().subscribe(data => {
      this.book = data;
    });
    this.messageService.currentMessages.subscribe((data) => {
      this.books = [];
      this.onDisplayBooks(data);
    });
    this.messageService.currentEvent$.subscribe(message => {
      this.searchTerm = message;
    });
    //
    // this.sortTerm = 'none';
    // this.messageService.currentMessages.subscribe((data) => {
    //   this.books = [];
    //   this.onDisplayBooks(data);
    // });
    // this.messageService.currentEvent$.subscribe(message => {
    //   this.searchTerm = message;
    // });
  }

  updateStatus(): any {
    if (localStorage.getItem('token') !== null && localStorage.getItem('roleType') === 'USER') {
      this.wishlistService.getIdFromWishList().subscribe(response => {
        this.cartValue = response.data;
        localStorage.setItem('cartItem', this.cartValue.length);
      });
      this.cartServiceService.getIdFromCartList().subscribe(response => {
        this.wishValue = response.data;
        localStorage.setItem('wishItem', this.wishValue.length);
      });
    }
  }

  onBookDetail(event) {
    event.stopPropagation();
  }

  onKey(event) {
    this.searchTerm = event;
  }

  onSelect(val: any) {
    this.sortTerm = val;
    console.log('sorting term', this.sortTerm);
  }

  onWish(bookId: any): any {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') !== null && localStorage.getItem('roleType') !== 'USER') {
      this.snackBar.open('Login to add book into WishList', 'OK', {
        duration: 2500,
      });
    } else {
      this.wishlistService.addToWishList(bookId, localStorage.getItem('token')).subscribe((data) => {
        console.log(data);
        this.updateStatus();
      });
      this.snackBar.open('Yeah, Added to WishList !!', 'Ok', {duration: 800});
    }
  }

  onDisplayBooks(data): any {
    console.log(data);
    if (data.status === 200) {
      this.size = data.data.length;
      data.data.forEach((bookData) => {
        this.books.push(bookData);
      });
    }
  }


  onAddBook(bookId: any) {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') !== null && localStorage.getItem('roleType') !== 'USER') {
      // this.addBookToCartInLocal(bookId);
      this.snackBar.open('Login to add book into cart', 'OK', {
        duration: 2500,
      });
    } else {
      // ********************************************************** //
      this.toggle = !this.toggle;
      this.item += 1;
      this.token = localStorage.getItem('token');
      // this.data.changeItem(this.item);
      this.cartServices.addToBag(bookId.bookId, this.token).subscribe((message) => {
        console.log(message);
        this.updateStatus();
        this.data.changeItem(message.data);
        this.snackBar.open('Book Added to Bag SuccessFully', 'OK', {
          duration: 1500,
        });
      });
    }
  }


  valueCheck(i: number, bookId: any): any {
    let key = -1;
    for (let i = 0; i <= this.cartValue.length; i++) {
      if (this.cartValue[i] === bookId) {
        key = bookId;
      }
    }
    return key;
  }

  wishCheck(i: number, bookId: any): any {
    let key = -1;
    for (let i = 0; i <= this.wishValue.length; i++) {
      if (this.wishValue[i] === bookId) {
        key = bookId;
      }
    }
    return key;
  }
}
