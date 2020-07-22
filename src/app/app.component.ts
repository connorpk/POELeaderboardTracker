import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { slideInAnimation } from './animations';
// import { UserStoreService } from './services/user-store.service';

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

  constructor(private router: Router){}

  prepareRoute(outlet: RouterOutlet){
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']
  }

  ngOnInit():void{
    // this.userStore.user$.subscribe(val => this.user = val);
  }

}
