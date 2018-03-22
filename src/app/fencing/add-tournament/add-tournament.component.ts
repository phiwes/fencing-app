import {Component, OnInit} from '@angular/core';
import {FencingService} from '../fencing.service';
import {TournamentModel} from '../../models/tournament.model';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-tournament',
  templateUrl: './add-tournament.component.html',
  styleUrls: ['./add-tournament.component.css']
})
export class AddTournamentComponent implements OnInit {

  constructor(private fencingService: FencingService) {
  }

  tournament: TournamentModel;
  tournamentSub: Subscription;


  ngOnInit() {
    this.tournament = new TournamentModel();

    this.fencingService.tournamentChanged.subscribe((response: TournamentModel) => {
      this.tournament = response;
    });
  }

  addTournament(form: NgForm) {
    this.tournament.date = form.value.date;
    this.tournament.location = form.value.location;
    this.tournament.name = form.value.name;

    this.fencingService.saveNewTournament(this.tournament);
  }

}
