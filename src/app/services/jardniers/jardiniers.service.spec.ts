import { TestBed } from '@angular/core/testing';

import { JardiniersService } from './jardiniers.service';

describe('JardiniersService', () => {
  let service: JardiniersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JardiniersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
