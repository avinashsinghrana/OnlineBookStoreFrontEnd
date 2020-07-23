import {Component, OnInit} from '@angular/core';
import {SellerService} from '../../services/seller.service';
import {MessageService} from '../../services/message.service';
import {MatSnackBar, MatDialog} from '@angular/material';
import {Book} from 'src/app/models/book.model';
import {UserService} from '../../services/user.service';
import {BookserviceService} from '../../services/bookservice/bookservice.service';
import {SellerListService} from '../../services/sellerList/seller-list.service';


@Component({
  selector: 'app-admin-books',
  templateUrl: './admin-books.component.html',
  styleUrls: ['./admin-books.component.scss'],
})
export class AdminBooksComponent implements OnInit {

  constructor(
    private vendorService: SellerService,
    private messageService: MessageService,
    private snackBar: MatSnackBar,
    private data: MessageService,
    private dialog: MatDialog,
    private bookService: BookserviceService,
    private sellerListService: SellerListService,
  ) {
  }

  allBooks: any = [];
  books = [];
  // book: Book[];
  searchTerm: string;
  message: string;
  size: any;
  sortTerm: string;
  item: any;
  page = 1;

  ngOnInit() {
    this.getBooksOfAdmin();
    this.sortTerm = 'none';
    // this.messageService.currentBooks.subscribe((data) => {
    //   this.books = [];
    //   this.onDisplayBooks(data);
    // });
    // this.messageService.currentEvent$.subscribe(message => {
    //   this.searchTerm = message;
    // });
  }

  onBookDetail(event) {
    event.stopPropagation();
  }

  onApproval(bookId: any, sellerId: any) {
    this.vendorService.onApprove(bookId, sellerId, localStorage.getItem('token')).subscribe(
      (response) => {
        console.log('aprrove log', response);
        this.getBooksOfAdmin();
        if (response.status === 200) {
          this.messageService.changeBooks();
          this.snackBar.open('Book approved successfully', 'ok', {
            duration: 2000,
          });
        }
      },
      (error) => {
        this.snackBar.open('Failed to Approved', 'ok', {
          duration: 2000,
        });
      }
    );
  }

  onDisapproval(bookId: number, sellerId: number) {
    console.log(bookId);
    this.vendorService.disApproveBook(bookId, sellerId, localStorage.getItem('token')).subscribe(
      (response) => {
        this.messageService.changeBooks();
        console.log('aprrove log', response);
        this.getBooksOfAdmin();
        this.snackBar.open('Book disapproved successfully', 'ok', {
          duration: 2000,
        });
      },
      (error: any) => {
        this.snackBar.open('Failed to disapproved book', 'ok', {duration: 2000});
      }
    );
  }

  // onDisplayBooks(data) {
  //   console.log(data);
  //   if (data.status === 200) {
  //     this.size = data.data.length;
  //     data.data.forEach((bookData) => {
  //       this.books.push(bookData);
  //
  //     });
  //   }
  // }


  private getBooksOfAdmin() {
    if (localStorage.getItem('token') != null && localStorage.getItem('roleType') === 'ADMIN') {
      this.vendorService.getAllBooksOfAdmin().subscribe(response => {
        this.allBooks = response.data;
        console.log('book', response.data);
        this.size = this.allBooks.length;
      });
    }
  }
}
