import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Account } from '../interfaces/account.interface'
import { AcctService } from './acct.service';

@Injectable({
  providedIn: 'root'
})
export class AcctStoreService {

  constructor() { }

  initAccts: Array<Account> = [];

  private readonly _accts = new BehaviorSubject<Array<Account>>(this.initAccts);
  
  readonly accts$: Observable<Array<Account>> = this._accts.asObservable();

  private get accts(): Array<Account>{
    return this._accts.getValue();
  }

  private set accts(val: Array<Account>){
    this._accts.next(val);
  }

  byUsername(username: string){
    return this.accts$.pipe(map(accts => accts.filter(a => a.characterName.toLowerCase() === username.toLowerCase())));
  }

  populateLeaderboard(accs: Array<Account>){
    this.accts = accs;
  }

}
