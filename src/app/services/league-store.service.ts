import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeagueStoreService {

  constructor() { }

  initLeague = "Harvest";

  private readonly _league = new BehaviorSubject<string>(this.initLeague);

  readonly league$: Observable<string> = this._league.asObservable();

  private get league(): string{
    return this._league.getValue();
  }

  private set league(val: string){
    this._league.next(val);
  }

  setLeague(val){
    this.league = val;
  }
}
