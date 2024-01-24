import { TestBed } from '@angular/core/testing';

import { LinkDataService } from '../lien/link-data.service';

describe('LinkDataService', () => {
  let service: LinkDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinkDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
