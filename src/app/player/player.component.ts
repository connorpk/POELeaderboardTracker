import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AcctStoreService } from '../services/acct-store.service';
import { Account } from '../interfaces/account.interface';
import { UserStoreService } from '../services/user-store.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  username: string;
  account: Account;

  constructor(private actr: ActivatedRoute, private acctStore: AcctStoreService,
     private userStore: UserStoreService, private router: Router) { }

  trackUser(){
    this.userStore.addTrackedAccount(this.account);
  }

  ngOnInit(): void {
    this.username = this.actr.snapshot.params.playername;
    this.acctStore.byUsername(this.username).subscribe(val => this.account = val[0]);
    console.log(this.account);
  }

}
