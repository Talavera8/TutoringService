import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { TutoringRequestCreateComponent } from './tutoring-requests/tutoring-request-create/tutoring-request-create.component';
import { TutoringRequestListComponent } from './tutoring-requests/tutoring-request-list/tutoring-request-list.component';
import { TutorListComponent } from './tutors/tutor-list/tutor-list.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "requestsView", component: TutoringRequestListComponent, canActivate: [AuthGuard] },
  { path: "requestCreate", component: TutoringRequestCreateComponent, canActivate: [AuthGuard] },
  { path: "signup", component: SignupComponent },
  { path: "login", component: LoginComponent },
  { path: "tutors", component: TutorListComponent, canActivate: [AuthGuard] },
  { path: "edit/:userId", component: SignupComponent, canActivate: [AuthGuard] },
  { path: "editRequest/:requestId", component: TutoringRequestCreateComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
