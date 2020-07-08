import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { slideInAnimation } from './animations';
import { UserStoreService } from './services/user-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations:[
    slideInAnimation
  ]
})
export class AppComponent implements OnInit {
  title = 'PathOfExileLeagueTracker';
  user: string = '';

  constructor(private userStore: UserStoreService, private router: Router){}

  prepareRoute(outlet: RouterOutlet){
    return outlet && outlet.activatedRoute && outlet.activatedRouteData['animation']
  }

  userPage(){
    this.userStore.user$.subscribe(val =>{
      if(val !== '')
      {
        this.router.navigate[`/user/${val}/tracked-players`];
      }
      else{
        this.router.navigate['/login'];
      }
    })
  }

  ngOnInit():void{
    this.userStore.user$.subscribe(val => this.user = val);
  }

}
