import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { UserStoreService } from '../services/user-store.service';
import { Account } from '../interfaces/account.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  displayedColumns: string[] = ['rank', 'account', 'level', 'class', 'twitch'];
  dataSource: MatTableDataSource<Account>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  sortBy: string = "rank";
  constructor(private userStore: UserStoreService, private router: Router) { }

  toBrowse(){
    this.router.navigateByUrl('');
  }

  moreInfo(acc: Account){
    this.router.navigateByUrl(`player/${acc.character.name}`);
  }

  ngOnInit(): void {
    this.userStore.trackedAccounts$.subscribe(val => {
      this.dataSource = new MatTableDataSource(val);
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
    })

  }

}
