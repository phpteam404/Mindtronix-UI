import { TestBed } from '@angular/core/testing';

import { OnlineUsersService } from './online-users.service';

describe('OnlineUsersService', () => {
  let service: OnlineUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnlineUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
