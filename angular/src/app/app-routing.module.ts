import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './home/navbar/navbar.component';
import { LogRegComponent } from './log-reg/log-reg.component';
import { MessageboardComponent } from './home/messageboard/messageboard.component';
import { SearchbarComponent } from './home/searchbar/searchbar.component';
import { ProfileComponent } from './home/profile/profile.component';
import { CommentComponent } from './home/comment/comment.component';
import { HomeComponent } from './home/home.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { CreateChannelComponent } from './home/create-channel/create-channel.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LogRegComponent
  },
  {
    path: 'messages',
    component: HomeComponent,
    children:[
      {path: 'profile', pathMatch: 'full', component: ProfileComponent},
      {path: 'comment', pathMatch: 'full', component: CommentComponent},
    ]
  },
  {
    path: 'newTeam',
    pathMatch: 'full',
    component: CreateTeamComponent
  },
  {
    path: 'newChannel',
    pathMatch: 'full',
    component: CreateChannelComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
