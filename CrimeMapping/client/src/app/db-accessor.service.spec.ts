import { TestBed, inject } from '@angular/core/testing';

import { DbAccessorService } from './db-accessor.service';

describe('DbAccessorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DbAccessorService]
    });
  });

  it('should be created', inject([DbAccessorService], (service: DbAccessorService) => {
    expect(service).toBeTruthy();
  }));
});
