import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailHousingManagementComponent } from './detail-housing-management.component';

describe('DetailHousingManagementComponent', () => {
  let component: DetailHousingManagementComponent;
  let fixture: ComponentFixture<DetailHousingManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailHousingManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailHousingManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
