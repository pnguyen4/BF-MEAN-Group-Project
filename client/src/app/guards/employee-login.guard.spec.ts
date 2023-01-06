import { TestBed } from '@angular/core/testing';

import { EmployeeLoginGuard } from './employee-login.guard';

describe('EmployeeLoginGuard', () => {
  let guard: EmployeeLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EmployeeLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
