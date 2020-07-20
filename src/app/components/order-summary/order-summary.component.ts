import {CartServiceService} from './../../services/cart-service/cart-service.service';
import {CustomerDetailsService} from './../../services/customer-Details/customer-details.service';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {RouterLink, Router} from '@angular/router';
import {Book} from '../../models/book.model';
import {MatRadioChange, MatDialog} from '@angular/material';
import {LoginComponent} from '../login/login.component';


@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {
  registerForm: FormGroup;
  popup = false;
  press = false;
  popDown = false;
  size = 0;
  sortTerm: any;
  books: any;
  person: string;
  token: string;

  constructor(public formBuilder: FormBuilder,
              private dialog: MatDialog,
              private customerDetailsService: CustomerDetailsService,
              private cartService: CartServiceService,
              private router: Router) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      locality: ['', [Validators.required]],
      pinCode: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      landMark: ['', [Validators.required]],
      locationType: ['', [Validators.required]]
    });
    this.getAllBookCart();
    console.log('address', this.registerForm);
  }


  getAllBookCart() {
    // tslint:disable-next-line:max-line-length
    // if (localStorage.getItem('token') === null || localStorage.getItem('token') !== null && localStorage.getItem('roleType') !== 'USER') {
    //   this.books = localStorage.getItem('CartObject');
    // }
    // else {
    this.cartService.getAllBookCart(localStorage.getItem('token')).subscribe((response: any) => {
      this.books = response;
      this.size = response.length;
      console.log(response);
    });
    // }
  }

  onPopup() {
    if (localStorage.getItem('token') == null) {
      this.dialog.open(LoginComponent, {
        width: '28%',
        height: 'auto'
      });
    }
    this.popup = true;
    this.popDown = true;
  }

  increaseQuantity(bookId: any, i: number) {
    this.books[i].quantity++;
    this.cartService.addBooks(bookId, localStorage.getItem('token')).subscribe((response: any) => {
      console.log('response', response);
      this.getAllBookCart();
    });
  }

  decreaseQuantity(bookId: any, i: number) {
    this.books[i].quantity--;
    if (this.books[i].quantity > 0) {
      this.cartService.removeItem(bookId, localStorage.getItem('token')).subscribe((response: any) => {
        console.log('response=', response);
        this.getAllBookCart();
      });
    }
  }

  getQuantitiy(index: any): boolean {
    if (this.books[index].quantity < 2) {
      return true;
    }
    return false;
  }


  removeAllItemsCart(bookId: any) {
    this.cartService.removeBookFromCart(bookId, localStorage.getItem('token')).subscribe((response: any) => {
      console.log('response', response);
      this.getAllBookCart();
    });
    // window.location.reload();
  }

  onPress() {
    console.log('data1', this.registerForm.value);
    this.token = localStorage.getItem('token');
    if (this.registerForm.valid) {
      this.customerDetailsService.addDetails(this.registerForm.value, this.token).subscribe((response: any) => {
        console.log('data', this.registerForm.value);
        console.log('response', response);
      });
    }
    this.press = true;
  }

  checkout(): any {
    this.token = localStorage.getItem('token');
    this.cartService.removeAll(this.token).subscribe((response: any) => {
      console.log('response', response);
      this.router.navigate(['/order-confirmation']);
    });
  }

  onChange(val: any) {
    this.sortTerm = val;
    this.person = this.sortTerm;
    console.log('sorting term', this.sortTerm);
  }
}
