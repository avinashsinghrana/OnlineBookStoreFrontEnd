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
  radioresponse = String;

  constructor(public formBuilder: FormBuilder,
              private dialog: MatDialog,
              private customerDetailsService: CustomerDetailsService,
              private cartService: CartServiceService,
              private router: Router) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.pattern('^[A-Z][a-zA-Z]+(\\s[A-Z][a-zA-Z]+)*')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('(0|91)?[6-9][0-9]{9}')]],
      locality: ['', [Validators.required, Validators.pattern('([A-Z]?[a-zA-Z\\s0-9]+){2,}')]],
      pinCode: ['', [Validators.required, Validators.pattern('[1-9][0-9]{5}')]],
      address: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9\\s\,\-\.()]{30,}')]],
      city: ['', [Validators.required, Validators.pattern('[A-Z]?[a-z]{3,}')]],
      landMark: ['', [Validators.required, Validators.pattern('^[A-Z]?[a-z\\s]{5,}')]],
      locationType : this.radioresponse,
    });
    this.getAllBookCart();
    console.log('address', this.registerForm);
  }


  getAllBookCart(): any {
    // tslint:disable-next-line:max-line-length
    // if (localStorage.getItem('token') === null || localStorage.getItem('token') !== null && localStorage.getItem('roleType') !== 'USER') {
    //   this.books = localStorage.getItem('CartObject');
    // }
    // else {
    this.cartService.getAllBookCart(localStorage.getItem('token')).subscribe((response: any) => {
      this.books = response.data;
      this.size = response.data.length;
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

  increaseQuantity(bookId: any, i: number): any {
    this.books[i].quantity++;
    this.cartService.addBooks(bookId, localStorage.getItem('token')).subscribe((response: any) => {
      console.log('response', response);
      this.getAllBookCart();
    });
  }

  decreaseQuantity(bookId: any, i: number): any {
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


  removeAllItemsCart(bookId: any): any {
    this.cartService.removeBookFromCart(bookId, localStorage.getItem('token')).subscribe((response: any) => {
      console.log('response', response);
      this.getAllBookCart();
    });
    // window.location.reload();
  }

  onPress(): any {
    // console.log('data1', this.registerForm.value);
    this.token = localStorage.getItem('token');
    if (this.registerForm.valid) {
      this.customerDetailsService.addDetails(this.registerForm.value, this.token).subscribe((response: any) => {
        console.log('data', this.registerForm.value);
        localStorage.setItem('AdressId', response.data);
        console.log('response', response);
      });
    }
    this.press = true;
  }

  checkout(): any {
    this.token = localStorage.getItem('token');
    this.cartService.removeAll(this.token, localStorage.getItem('AdressId')).subscribe((response: any) => {
      console.log('response', response.data);
      localStorage.removeItem('AdressId');
      localStorage.removeItem('cartItem');
      this.router.navigate(['/order-confirmation']);
    });
  }

  onChange(val: MatRadioChange) {
    this.sortTerm = val;
    this.radioresponse = this.sortTerm.value;
    console.log(this.radioresponse);
  }
}
