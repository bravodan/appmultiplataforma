import { TestBed } from '@angular/core/testing';

import { RefBibilograficasService } from './ref-bibilograficas.service';

describe('RefBibilograficasService', () => {
  let service: RefBibilograficasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefBibilograficasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
