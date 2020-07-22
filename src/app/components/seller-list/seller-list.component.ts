import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {SellerListService} from '../../services/sellerList/seller-list.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-seller-list',
  templateUrl: './seller-list.component.html',
  styleUrls: ['./seller-list.component.scss']
})
export class SellerListComponent implements OnInit {
  sellerLists: any[];
  page = 1;
  name = localStorage.getItem('name');

  constructor(
    public sellerListService: SellerListService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.getAllSellerDetails();
  }

  showList(userId: any) {
    localStorage.setItem('sellerListId', userId);
    this.sellerListService.setSellerId(userId);
    console.log('seller id of seller service ', this.sellerListService.sellerId);
    this.router.navigate(['/adminDashboard/admin-books']);
  }

  private getAllSellerDetails() {
    if (localStorage.getItem('token') !== null && localStorage.getItem('roleType') === 'ADMIN') {
      this.sellerListService.getAllsellerList().subscribe(response => {
        this.sellerLists = response.data;
      });
    }
  }
}
