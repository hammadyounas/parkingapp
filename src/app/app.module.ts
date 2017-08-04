import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//angular material
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdButtonModule,
  MdCheckboxModule,
  MdInputModule,
  MdTableModule,
  MdToolbarModule,
  MdTabsModule,
  MdCardModule,
  MdDatepickerModule,
  MdNativeDateModule,
  MdSelectModule,
  MdTooltipModule
} from '@angular/material';
import 'hammerjs';
import { CdkTableModule } from '@angular/cdk';
//import {CollectionViewer, DataSource} from './data-source';


//Reactive form module
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//Routing Module 
import { AppRoutingModule } from './app-routing.module'

//Angularfire2 
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';


//Services
//import { AuthService } from './auth.service'
import { AuthService } from './provider/auth.service';
import { DataService } from "./provider/data.service";
import { ChatService } from "./provider/chat.service";

//auth guard
import { AuthGuard } from './auth.guard';
import { AdministratorGuard } from "./provider/administrator.guard";

//components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
//import { PlaceComponent } from './place/place.component';
import { ParkingPlaceComponent } from './user/parking-place/parking-place.component';
import { BookParkingComponent } from './user/book-parking/book-parking.component';
import { ViewBookingComponent } from './user/view-booking/view-booking.component';
import { FeedbackComponent } from './user/feedback/feedback.component';
import { AddUserComponent } from './admin/add-user/add-user.component';
import { BookingsComponent } from './admin/bookings/bookings.component';
import { ViewUsersComponent } from './admin/view-users/view-users.component';
import { ViewFeedbackComponent } from './admin/view-feedback/view-feedback.component';
import { AirportComponent } from './user/airport/airport.component';
import { CollegeComponent } from './user/college/college.component';
import { HospitalComponent } from './user/hospital/hospital.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    AdminComponent,
    UserComponent,
    //PlaceComponent,
    ParkingPlaceComponent,
    BookParkingComponent,
    ViewBookingComponent,
    FeedbackComponent,
    AddUserComponent,
    BookingsComponent,
    ViewUsersComponent,
    ViewFeedbackComponent,
    AirportComponent,
    CollegeComponent,
    HospitalComponent,
    
  ],
  imports: [
    BrowserModule,
    //angular material
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    MdInputModule,
    MdTableModule,
    CdkTableModule,
    MdToolbarModule,
    MdTabsModule,
    MdCardModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdSelectModule,
    MdTableModule,
    MdTooltipModule,

    //angular form
    ReactiveFormsModule,
    FormsModule,

    //Routing
    AppRoutingModule,
    //angular fire2
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule

  ],
  exports: [
    MdButtonModule,
    MdCheckboxModule,
    MdInputModule,

  ],
  providers: [
    AuthGuard,
    AuthService,
    AdministratorGuard,
    DataService,
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
