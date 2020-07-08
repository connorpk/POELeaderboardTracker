import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AcctStoreService } from './acct-store.service';
import {Response} from '../interfaces/response.interface'

@Injectable({
  providedIn: 'root'
})
export class AcctService {

  constructor(private http: HttpClient, private acctStore: AcctStoreService) { }

  leaderboard(league:string):void{
    this.http.get(`http://api.pathofexile.com/ladders/${league}?limit=200`).pipe(map((res: Response) => res)).subscribe((res: Response) =>{
    this.acctStore.newLeague(league, res.entries)
    })
  }



}
