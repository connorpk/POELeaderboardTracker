import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowseComponent } from './browse/browse.component';
import { UserComponent } from './user/user.component';
import { PlayerComponent } from './player/player.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
{path: '', component: BrowseComponent, data: {animation: 'stuff'}},
{path: 'user/:username/tracked-players', component: UserComponent, canActivate: [AuthGuard], data: {animation: "user"} },
{path: 'player/:playername', component: PlayerComponent, data: {animation: "player"}},
{path: 'login', component: LoginComponent, data: {animation: "login"}},
{path: '**', component: BrowseComponent, data: {animation: "browse"}}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
