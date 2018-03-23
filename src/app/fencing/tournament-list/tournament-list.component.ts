import {Component, OnInit, ViewChild} from '@angular/core';
import {Exercise} from '../../training/exercise.model';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FencingService} from '../fencing.service';
import {TournamentModel} from '../../models/tournament.model';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.css']
})
export class TournamentListComponent implements OnInit {
  displayedColumns = ['date', 'name', 'location', 'action'];
  tournamentsSubscription: Subscription;




  dataSource = new MatTableDataSource<TournamentModel>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private fencingService: FencingService, private router: Router) { }

  ngOnInit() {
    this.tournamentsSubscription = this.fencingService.tournamentsChanged.subscribe(
      (tournaments: TournamentModel[]) => {
        this.dataSource.data = tournaments;
      }
    )
    this.fencingService.fetchTournaments();

  };





  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editTournament(tournament: TournamentModel){
    this.fencingService.tournamentChanged.next(tournament);
    this.fencingService.tournamentEditing.next(true);
    this.fencingService.fetchTournamentById(tournament.id);
    this.fencingService.tournamentEditing.next(true);
  }

  toAddEvent(tournament: TournamentModel){
    this.fencingService.tournamentChanged.next(tournament);
    this.fencingService.tournamentId = tournament.id;
    this.router.navigateByUrl('/event-list');
  }

  deleteTournament(tournament: TournamentModel){
    this.fencingService.deleteTournament(tournament);
  }
}
