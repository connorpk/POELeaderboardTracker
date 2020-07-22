import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AcctStoreService } from './acct-store.service';
import { Account } from '../interfaces/account.interface';

@Injectable({
  providedIn: 'root'
})
export class AcctService {

  constructor(private http: HttpClient, private acctStore: AcctStoreService) { }

  leaderboard():void{
    this.http.get(`/api/leaderboard`).pipe(map((res: Array<Account>) => res)).subscribe((res: Array<Account>) =>{
    this.acctStore.populateLeaderboard(res['accounts']);
    })
  }



}
