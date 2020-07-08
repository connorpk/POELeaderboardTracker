import { Component, OnInit, ViewChild} from '@angular/core';
import { AcctStoreService } from '../services/acct-store.service';
import { AcctService } from '../services/acct.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Account } from '../interfaces/account.interface';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {


  leagues: string[] = ['Harvest', 'Hardcore Harvest', 'SSF Harvest', 'SSF Harvest HC']
  displayedColumns: string[] = ['rank', 'account', 'level', 'class', 'twitch'];
  dataSource: MatTableDataSource<Account>;

  searchForm: FormGroup;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  defaultLeague: string = 'Harvest'


  league: string = this.defaultLeague;
  

  constructor(private acctStore: AcctStoreService,
     private acctService: AcctService,
      private router: Router,
      private fb: FormBuilder) { }


  moreInfo(acc: Account){
    this.router.navigateByUrl(`player/${acc.character.name}`);
  }

  userPage(){
    this.router.navigateByUrl('/user/a/tracked-players');
  }

  getLeaderboard(){
    this.acctService.leaderboard(this.league);
  }

  get accountName(){
    return this.searchForm.get('accountName').value.toLowerCase().trim()
  }
  
  get className(){
    return this.searchForm.get('className').value.toLowerCase().trim()
  }

  get twitchName(){
    return this.searchForm.get('twitchName').value.toLowerCase().trim()
  }


  applyFilter(){
    this.dataSource.filter = JSON.stringify([this.accountName, this.className, this.twitchName])
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      accountName:['', Validators.compose([Validators.minLength(3), Validators.maxLength(144)])],
      className:['', Validators.compose([Validators.minLength(3), Validators.maxLength(144)])],
      twitchName:['', Validators.compose([Validators.minLength(3), Validators.maxLength(144)])]
    })
    this.getLeaderboard();
    this.acctStore.accts$.subscribe(val => {
      this.dataSource = new MatTableDataSource(val.accounts);
      this.dataSource.filterPredicate = (data: Account, filter: string) =>{
        let filterValue = JSON.parse(filter);
        console.log(filterValue)
        if(filterValue[2] === ''){
          return data.account.name.toLowerCase().includes(filterValue[0]) && 
          data.character.class.toLowerCase().includes(filterValue[1])
        }
        else{
          return data.account.name.includes(filterValue[0]) && 
          data.character.class.includes(filterValue[1]) &&
          data.account.twitch &&
          data.account.twitch.name.includes(filterValue[2])
        }
      }
      this.dataSource.sortingDataAccessor = (val, hRow) =>{
        switch(hRow){
          case 'rank': return val.rank;
          case 'account': return val.account.name;
          case 'level': return val.character.level;
          case 'class': return val.character.class;
          case 'twitch': return val.account.twitch ? val.account.twitch.name : 'zzzzzzzz';
        }
      }
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(val);
    })
  }


}
