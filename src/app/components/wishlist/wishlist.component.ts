import {Component, OnInit} from '@angular/core';
import {WishlistService} from '../wishListservice/wishlist.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  books: any;

  constructor(private wishService: WishlistService) {
  }

  ngOnInit(): any {
    this.getAllBookOfWL();
    const sqnc = new Observable(this.books);

  }

  removeFromWishList(bookId: any) {
    this.wishService.removeFromWL(bookId, localStorage.getItem('token')).subscribe(reponse => {
      console.log(reponse.data);
      if (this.books.length > 0) {
        this.getAllBookOfWL();
      }
    });
  }

  addToCart(bookId: any): any {
    this.wishService.addtoCartFromWL(bookId, localStorage.getItem('token')).subscribe(response => {
      console.log(response.data);
      this.getAllBookOfWL();
    });
  }

  public getAllBookOfWL(): any {
    this.wishService.getBookOfWishList(localStorage.getItem('token')).subscribe(response => {
      this.books = response.data;
    });
  }
}
