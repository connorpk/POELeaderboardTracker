import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AcctStoreService } from '../services/acct-store.service';
import { Account } from '../interfaces/account.interface';
import { AcctService } from '../services/acct.service';
// import { UserStoreService } from '../services/user-store.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  username: string;
  account: Account;

  constructor(private actr: ActivatedRoute, private acctStore: AcctStoreService,
              private router: Router, private acctService: AcctService) { }

  // trackUser(){
  //   this.userStore.addTrackedAccount(this.account);
  // }

  ngOnInit(): void {
    this.username = this.actr.snapshot.params.playername;
    this.acctStore.accts$.subscribe(val =>{
      if(val.length == 0){
        this.acctService.leaderboard();
      }
    })
    this.acctStore.byUsername(this.username).subscribe(val => this.account = val[0]);
  }

}
