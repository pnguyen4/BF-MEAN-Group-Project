import { TestBed } from '@angular/core/testing';

import { HrLoginGuard } from './hr-login.guard';

describe('HrLoginGuard', () => {
  let guard: HrLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HrLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
