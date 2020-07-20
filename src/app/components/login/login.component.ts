import {Component, OnInit, Inject} from '@angular/core';
import {
  FormControl,
  Validators
} from '@angular/forms';

import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialogRef} from '@angular/material/dialog';
import {Login} from 'src/app/models/login.model';
import {MatDialog} from '@angular/material/dialog';
import {RegisterComponent} from '../register/register.component';
import {ForgotpasswordComponent} from '../forgotpassword/forgotpassword.component';
import {NgxSpinnerService} from 'ngx-spinner';
import {CartServiceService} from '../../services/cart-service/cart-service.service';
import {CartserviceService} from '../../services/cartservice.service';
import {Book} from '../../model/book.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private books: any[];

  constructor(
    private dialog: MatDialog,
    public snackbar: MatSnackBar,
    private router: Router,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private cartServices: CartserviceService,
    private dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Login
  ) {
  }

  // book: Book[];
  response: any;
  successMsg: string;
  failedMsg: string;
  incorrectInput: string;
  toggle: boolean;
  isLogin: false;
  reqbody = {
    emailId: null,
    password: null
  };

  model = {};
  hide = true;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.pattern('((?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%!]).{8,40})')]);

  ngOnInit(): void {
  }

  // To display email error message
  getEmailErrorMessage() {
    return this.emailFormControl.hasError('required')
      ? 'Email id is required'
      : this.emailFormControl.hasError('email')
        ? 'Please enter valid email id'
        : ' ';
  }

  // To display password error message
  getPasswordErrorMessage() {
    return this.password.hasError('required')
      ? 'Password is required'
      : this.password.hasError('pattern')
        ? 'Please enter valid password'
        : ' ';
  }

  validate() {
    if (this.emailFormControl.valid && this.password.valid) {
      this.toggle = false;
      return 'false';
    }
    this.toggle = true;
    return 'true';
  }

  login() {
    this.spinner.show();
    this.reqbody.emailId = this.emailFormControl.value;
    this.reqbody.password = this.password.value;
    console.log(this.reqbody);
    // @ts-ignore
    this.userService.login(this.reqbody).subscribe(
      data => {
        console.log(data);
        this.dialogRef.close();
        this.spinner.hide();
        this.response = data;
        localStorage.setItem('email', this.reqbody.emailId);
        localStorage.setItem('name', this.response.message);
        localStorage.setItem('token', this.response.data);
        localStorage.setItem('roleType', this.response.roleType);
        location.reload();
      },
      err => {
        this.spinner.hide();
        this.snackbar.open('Login Failed', 'Ok', {duration: 5000});
      });
    // this.book = JSON.parse(localStorage.getItem('cartObject'));
    // console.log(this.book);
    // console.log('to check ', this.book[0].bookId);
    // for (let i = 0; i < localStorage.length; i++) {
    //   let key = localStorage.key(i);
    //   console.log('key', key);
    //   console.log('value', JSON.parse(localStorage.getItem(key)));
    //   this.books.push(JSON.parse(localStorage.getItem(key)));
    //   // tslint:disable-next-line:prefer-for-of
    // }
    // tslint:disable-next-line:prefer-for-of
    // for (let i = 0; i < this.books.length; i++) {
    //   console.log('book list ', this.books[i]);
    //   this.cartServices.addToBag(this.books[i].bookId, localStorage.getItem('token')).subscribe((message) => {
    //     console.log(message);
    //     // this.updateStatus();
    //   });
    // }
      // this.data.changeItem(this.item);

      // this.updateStatus();
      // this.data.changeItem(message.data);
      // this.snackBar.open('Book Added to Bag SuccessFully', 'OK', {
      //   duration: 1500,
      // });
      // });
  }

    register()
    {
      this.dialogRef.close();
      this.dialog.open(RegisterComponent, {
        width: '35%',
        height: 'auto'
      });
    }

    forgotpassword()
    {
      this.dialogRef.close();
      this.dialog.open(ForgotpasswordComponent, {
        width: '30%',
        height: 'auto'
      });
    }

  }
