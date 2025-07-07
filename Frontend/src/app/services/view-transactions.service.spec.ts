import { TestBed } from '@angular/core/testing';

import { ViewTransactionsService } from './view-transactions.service';

describe('ViewTransactionsService', () => {
  let service: ViewTransactionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewTransactionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
