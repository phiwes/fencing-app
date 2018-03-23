import {Component, OnInit, ViewChild} from '@angular/core';
import {TournamentModel} from '../../models/tournament.model';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';
import {FencingService} from '../fencing.service';
import {EventModel} from '../../models/event.model';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  displayedColumns = ['weapon', 'gender', 'category', 'action'];
  eventsSub: Subscription;



  dataSource = new MatTableDataSource<EventModel>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private fencingService: FencingService, private router: Router) { }

  ngOnInit() {
    this.eventsSub = this.fencingService.eventsChanged.subscribe(
      (events: EventModel[]) => {
        this.dataSource.data = events;
      }
    );
    this.fencingService.fetchEventsByTournament();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  editEvent(event: EventModel){
    this.fencingService.eventChanged.next(event);
    this.fencingService.eventEditing.next(true);
    this.fencingService.eventEditingId.next(event.id);
  }


  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  toAddBout(event: EventModel){
    this.fencingService.eventChanged.next(event);
    this.fencingService.eventEditingId.next(event.id);
    this.fencingService.eventId = event.id;
    console.log()
    this.router.navigateByUrl('/bout-list');
  }
}
