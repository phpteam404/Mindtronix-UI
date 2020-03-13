import { TestBed } from '@angular/core/testing';

import { DigitalContentService } from './digital-content.service';

describe('DigitalContentService', () => {
  let service: DigitalContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DigitalContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
