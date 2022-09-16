import { TestBed } from '@angular/core/testing';

import { SilverwareclientService } from './silverwareclient.service';

describe('SilverwareclientService', () => {
  let service: SilverwareclientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SilverwareclientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
