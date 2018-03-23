import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { TrainingComponent } from './training/training.component';
import { AuthGuard } from './auth/auth.guard';
import {AddTournamentComponent} from './fencing/add-tournament/add-tournament.component';
import {TournamentListComponent} from './fencing/tournament-list/tournament-list.component';
import {EventComponent} from './fencing/event/event.component';
import {EventListComponent} from './fencing/event-list/event-list.component';
import {BoutListComponent} from './fencing/bout-list/bout-list.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'training', component: TrainingComponent, canActivate: [AuthGuard] },
  { path: 'tournament', component: AddTournamentComponent, canActivate: [AuthGuard] },
  { path: 'tournament-list', component: TournamentListComponent, canActivate: [AuthGuard] },
  { path: 'event', component: EventComponent, canActivate: [AuthGuard] },
  { path: 'event-list', component: EventListComponent, canActivate: [AuthGuard] },
  { path: 'bout-list', component: BoutListComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
