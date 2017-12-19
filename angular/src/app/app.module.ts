import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

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
import { CreateTeamComponent } from './create-team/create-team.component';
import { CreateChannelComponent } from './home/create-channel/create-channel.component';
import { ResultsComponent } from './home/results/results.component';
import { JoinComponent } from './join/join.component';

import { UserService } from './services/user.service';
import { TeamService } from './services/team.service';
import { ChannelService } from './services/channel.service';
import { MessageService } from './services/message.service';
import { CommentService } from './services/comment.service';
import { TeamSearchComponent } from './join/team-search/team-search.component';
import { SearchResultsService } from './services/search-results.service';

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
    NewMessageComponent,
    CreateTeamComponent,
    CreateChannelComponent,
    JoinComponent,
    TeamSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [
    UserService,
    TeamService,
    ChannelService,
    MessageService,
    CommentService,
    SearchResultsService,
    SearchResultsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
