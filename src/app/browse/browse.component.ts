import { Component, OnInit, ViewChild } from '@angular/core';
import { AcctStoreService } from '../services/acct-store.service';
import { AcctService } from '../services/acct.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Account } from '../interfaces/account.interface';
import { LeagueStoreService } from '../services/league-store.service';
import { LeagueService } from '../services/league.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {


  leagues: string[] = ['Harvest', 'Hardcore Harvest', 'SSF Harvest', 'SSF Harvest HC']
  displayedColumns: string[] = ['rank', 'account', 'level', 'class', 'twitch'];
  dataSource: MatTableDataSource<Account>;
  league: string;

  searchForm: FormGroup;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;




  constructor(private acctStore: AcctStoreService,
    private acctService: AcctService,
    private router: Router,
    private fb: FormBuilder,
    private leagueStore: LeagueStoreService,
    private leagueService: LeagueService) { }


  moreInfo(acc: Account) {
    this.router.navigateByUrl(`player/${acc.characterName}`);
  }

  userPage() {
    this.router.navigateByUrl('/user/a/tracked-players');
  }

  getLeaderboard() {
    this.acctService.leaderboard();
  }

  setLeague(league:string){
    this.leagueService.setLeague(league);
  }

  get accountName() {
    return this.searchForm.get('accountName').value.toLowerCase().trim()
  }

  get className() {
    return this.searchForm.get('className').value.toLowerCase().trim()
  }

  get twitchName() {
    return this.searchForm.get('twitchName').value.toLowerCase().trim()
  }

  applyFilter() {
    this.dataSource.filter = JSON.stringify([this.accountName, this.className, this.twitchName])
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      accountName: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(144)])],
      className: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(144)])],
      twitchName: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(144)])]
    })
    this.acctStore.accts$.subscribe(val => {
      if(val.length ==0)this.getLeaderboard();
      console.log(val);
      this.dataSource = new MatTableDataSource(val);
      this.dataSource.filterPredicate = (data: Account, filter: string) => {
        let filterValue = JSON.parse(filter);
        return data.league == this.league &&
          data.accountName.toLowerCase().includes(filterValue[0]) &&
          data.class.toLowerCase().includes(filterValue[1]) &&
          data.twitchName.toLowerCase().includes(filterValue[2])
      }
      this.dataSource.sortingDataAccessor = (val, hRow) => {
        switch (hRow) {
          case 'rank': return val.rank;
          case 'account': return val.accountName;
          case 'level': return val.level;
          case 'class': return val.class;
          case 'twitch': return val.twitchName == 'N/A' ? 'zzzzzzz' : val.twitchName;
        }
      }
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(val);
      this.leagueStore.league$.subscribe(val =>{
        this.league = val;
      })
      this.applyFilter();
    })
  }


}
