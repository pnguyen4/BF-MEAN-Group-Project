import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './features/signin/signin.component';
import { SignupComponent } from './features/signup/signup.component';
import { EmployeeComponent } from './features/employee/employee.component';
import { OnboardingApplicationComponent } from './features/employee/onboarding-application/onboarding-application.component';
import { PersonalInformationComponent } from './features/employee/personal-information/personal-information.component';
import { VisaStatusComponent } from './features/employee/visa-status/visa-status.component';
import { HousingComponent } from './features/employee/housing/housing.component';
import { HrComponent } from './features/hr/hr.component';
import { EmployeeProfilesComponent } from './features/hr/employee-profiles/employee-profiles.component';
import { VisaManagementComponent } from './features/hr/visa-management/visa-management.component';
import { HiringManagementComponent } from './features/hr/hiring-management/hiring-management.component';
import { HousingManagementComponent } from './features/hr/housing-management/housing-management.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { EmployeeNavbarComponent } from './features/employee/employee-navbar/employee-navbar.component';
import { HrNavbarComponent } from './features/hr/hr-navbar/hr-navbar.component';
import { DetailHousingManagementComponent } from './features/hr/detail-housing-management/detail-housing-management.component';
import { PendingPipe, RejectedPipe, ApprovedPipe } from './shared/filter.pipe';

import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/user.reducer';
import { housingReducer } from './store/housing.reducer';
import { applicationReducer } from './store/application.reducer';
import { registerTokenReducer } from './store/registerToken.reducer';
import { isOnboardingReducer } from './store/isOnboarding.reducer';
import { FacilityReportComponent } from './features/employee/facility-report/facility-report.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    EmployeeComponent,
    OnboardingApplicationComponent,
    PersonalInformationComponent,
    VisaStatusComponent,
    HousingComponent,
    HrComponent,
    EmployeeProfilesComponent,
    VisaManagementComponent,
    HiringManagementComponent,
    HousingManagementComponent,
    EmployeeNavbarComponent,
    HrNavbarComponent,
    DetailHousingManagementComponent,
    PendingPipe,
    RejectedPipe,
    ApprovedPipe,
    FacilityReportComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
    MatTableModule,
    StoreModule.forRoot({
      user: userReducer,
      housing: housingReducer,
      application: applicationReducer,
      registerToken: registerTokenReducer,
      isOnboarding: isOnboardingReducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
