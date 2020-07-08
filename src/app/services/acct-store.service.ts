import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Account } from '../interfaces/account.interface'
import { League } from '../interfaces/league.interface';

@Injectable({
  providedIn: 'root'
})
export class AcctStoreService {

  constructor() { }

  initAccts: League = {accounts: [], league: ''};

  private readonly _accts = new BehaviorSubject<League>(this.initAccts);
  
  readonly accts$: Observable<League> = this._accts.asObservable();

  private get accts(): League{
    return this._accts.getValue();
  }

  private set accts(val: League){
    this._accts.next(val);
  }

  byUsername(username: string){
    return this.accts$.pipe(map(accts => accts.accounts.filter(a => a.character.name.toLowerCase() === username.toLowerCase())));
  }

  byClass(charClass: string){
    return this.accts$.pipe(map(accts => accts.accounts.filter(a => a.character.class.toLowerCase() === charClass.toLowerCase())));
  }

  byTwitch(twitch: string){
    return this.accts$.pipe(map(accts => accts.accounts.filter(a => {
      if(a.account.twitch && a.account.twitch.name === twitch){
        return true;
      }
      else return false;
    })));
  }


  newLeague(l: string, a: Array<Account>){
    this.accts = this.initAccts;
    this.accts = {accounts: a, league: l};
  }

}
