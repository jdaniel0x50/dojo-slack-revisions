import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { UserService } from './user.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './home/navbar/navbar.component';
import { LogRegComponent } from './log-reg/log-reg.component';
import { MessageboardComponent } from './home/messageboard/messageboard.component';
import { SearchbarComponent } from './home/searchbar/searchbar.component';
import { ProfileComponent } from './home/profile/profile.component';
import { CommentComponent } from './home/comment/comment.component';
import { RegistrationComponent } from './log-reg/registration/registration.component';
import { LoginComponent } from './log-reg/login/login.component';
import { HomeComponent } from './home/home.component';
import { NewMessageComponent } from './home/new-message/new-message.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LogRegComponent,
    MessageboardComponent,
    SearchbarComponent,
    ProfileComponent,
    CommentComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    NewMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
