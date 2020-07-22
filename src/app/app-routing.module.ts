import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowseComponent } from './browse/browse.component';
// import { UserComponent } from './user/user.component';
import { PlayerComponent } from './player/player.component';
// import { LoginComponent } from './login/login.component';


const routes: Routes = [
{path: '', pathMatch: 'full', redirectTo: 'leaderboard'},
// {path: 'user/:username/tracked-players', component: UserComponent, data: {animation: "user"} },
{path: 'player/:playername', component: PlayerComponent, data: {animation: "player"}},
// {path: 'login', component: LoginComponent, data: {animation: "login"}},
{path: 'leaderboard', component: BrowseComponent, data: {animation: "browse"}},
{path: '**', redirectTo: 'browse'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
