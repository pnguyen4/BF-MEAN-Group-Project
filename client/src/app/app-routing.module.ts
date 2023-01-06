import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './features/employee/employee.component';
import { HousingComponent } from './features/employee/housing/housing.component';
import { OnboardingApplicationComponent } from './features/employee/onboarding-application/onboarding-application.component';
import { PersonalInformationComponent } from './features/employee/personal-information/personal-information.component';
import { VisaStatusComponent } from './features/employee/visa-status/visa-status.component';
import { EmployeeProfilesComponent } from './features/hr/employee-profiles/employee-profiles.component';
import { HiringManagementComponent } from './features/hr/hiring-management/hiring-management.component';
import { HousingManagementComponent } from './features/hr/housing-management/housing-management.component';
import { HrComponent } from './features/hr/hr.component';
import { VisaManagementComponent } from './features/hr/visa-management/visa-management.component';
import { SigninComponent } from './features/signin/signin.component';
import { SignupComponent } from './features/signup/signup.component';

import { RegistrationGuard } from './guards/registration.guard';

const routes: Routes = [
  { path:'signin', component: SigninComponent}, // TODO: add guard to redirect to employee or hr home
  { path:'signup/:regtoken',
    canActivate: [RegistrationGuard],
    component: SignupComponent},
  { path:'employee', component: EmployeeComponent,
    children:[
      //{path: '', component: } // TODO either redirect to a default page or make homepage component
      {path:'onboarding-application', component: OnboardingApplicationComponent},
      {path:'personal-information', component: PersonalInformationComponent},
      {path:'visa-status', component: VisaStatusComponent},
      {path:'housing', component: HousingComponent},
    ]
  },
  { path:'hr', component: HrComponent,
    children:[
      //{path: '', component: } // TODO either redirect to a default page or make homepage component
      {path:'employee-profiles', component: EmployeeProfilesComponent},
      {path:'visa-management', component: VisaManagementComponent},
      {path:'hiring-management', component: HiringManagementComponent},
      {path:'housing-management', component: HousingManagementComponent},
    ]
  },
  { path:'**', redirectTo:'/first' }]; // TODO redirect to signin or error page

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
