import { Injectable } from '@angular/core';
import { Account } from '../interfaces/account.interface'
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  trackedAccountsInit: Array<Account> = [];

  constructor(private router: Router) { }

  private readonly _user = new BehaviorSubject<string>('');
  readonly user$: Observable<string> = this._user.asObservable();
  private readonly _trackedAccounts = new BehaviorSubject<Array<Account>>(this.trackedAccountsInit);
  readonly trackedAccounts$: Observable<Array<Account>> = this._trackedAccounts.asObservable();

  private get user(){
    return this._user.getValue();
  }

  private set user(username: string){
    this._user.next(username);
  }

  private get trackedAccounts(){
    return this._trackedAccounts.getValue();
  }

  private set trackedAccounts(accts: Array<Account>){
    this._trackedAccounts.next(accts);
  }

  logout(){
    this.user = '';
    this.router.navigate(['/login'])
  }

  login(uname: string, pwd: string){
    if(uname && pwd){
      this.user = uname;
      this.router.navigate(['']);
    }
  }

  addTrackedAccount(acct: Account){
    let found = false;
    for(var i = 0; i < this.trackedAccounts.length; i++){
      if(this.trackedAccounts[i].account.name === acct.account.name)
      {
        found = true;
        break;
      }
    }

    if(!found){
      this.trackedAccounts = [...this.trackedAccounts, acct];
    }

    console.log(this.trackedAccounts);
  }

  removeTrackedAccount(acct: Account){
    this.trackedAccounts = this.trackedAccounts.filter(a => a.account.name !== acct.account.name);
  }

}
