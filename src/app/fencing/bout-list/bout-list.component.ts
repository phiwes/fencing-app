import {Component, OnInit, ViewChild} from '@angular/core';
import {EventModel} from '../../models/event.model';
import {Router} from '@angular/router';
import {FencingService} from '../fencing.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs/Subscription';
import {BoutModel} from '../../models/bout.model';

@Component({
  selector: 'app-bout-list',
  templateUrl: './bout-list.component.html',
  styleUrls: ['./bout-list.component.css']
})
export class BoutListComponent implements OnInit {

  displayedColumns = ['date', 'name', 'location', 'action'];
  boutsSub: Subscription;

  dataSource = new MatTableDataSource<BoutModel>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private fencingService: FencingService, private router: Router) { }

  ngOnInit() {
    this.boutsSub = this.fencingService.boutsChanged.subscribe(
      (bouts: BoutModel[]) => {
        this.dataSource.data = bouts;
      }
    );
    this.fencingService.fetchBoutsByEvent();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editBout(bout: BoutModel){
    this.fencingService.boutChanged.next(bout);
    this.fencingService.boutEditing.next(true);
    this.fencingService.boutEditingId.next(bout.id);
  }
}
