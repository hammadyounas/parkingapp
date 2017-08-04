import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth.guard';
import { UserComponent } from './user/user.component';
import { AdminComponent } from "./admin/admin.component";
import { AdministratorGuard } from "./provider/administrator.guard";
import { BookParkingComponent } from "./user/book-parking/book-parking.component";
import { ViewBookingComponent } from "./user/view-booking/view-booking.component";
import { FeedbackComponent } from "./user/feedback/feedback.component";
import { BookingsComponent } from "./admin/bookings/bookings.component";
import { ViewUsersComponent } from "./admin/view-users/view-users.component";
import { ViewFeedbackComponent } from "./admin/view-feedback/view-feedback.component";
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'user',
    canActivate: [AuthGuard],
    component: UserComponent,
    children: [
      { path: 'book-parking', component: BookParkingComponent },
      { path: 'view-booking', component: ViewBookingComponent },
      { path: 'feedback', component: FeedbackComponent },
    ]
  },
  {
    path: 'admin',
    canActivate: [AdministratorGuard],
    component: AdminComponent,
    children: [
      { path: 'bookings', component: BookingsComponent },
      { path: 'view-users', component: ViewUsersComponent },
      { path: 'view-feedback', component: ViewFeedbackComponent }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}