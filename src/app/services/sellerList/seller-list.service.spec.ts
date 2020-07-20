import { TestBed } from '@angular/core/testing';

import { SellerListService } from './seller-list.service';

describe('SellerListService', () => {
  let service: SellerListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellerListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
