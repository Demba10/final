import { TestBed } from '@angular/core/testing';

import { BannerUserService } from './banner-user.service';

describe('BannerUserService', () => {
  let service: BannerUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BannerUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
