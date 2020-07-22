import { Injectable } from '@angular/core';
import { LeagueStoreService } from './league-store.service';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  constructor(private leagueStore: LeagueStoreService) { }

  setLeague(league){
    this.leagueStore.setLeague(league);
  }
}
