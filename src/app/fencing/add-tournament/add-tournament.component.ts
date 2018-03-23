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

  editingSub: Subscription;
  editingMode: boolean;

  ngOnInit() {
    this.tournament = new TournamentModel();

    this.tournamentSub = this.fencingService.tournamentChanged.subscribe((response: TournamentModel) => {
      this.tournament = response;
    });

    this.editingSub = this.fencingService.tournamentEditing.subscribe(
      (response: boolean) => {
        this.editingMode = response;
      }
    );
  }

  addTournament(form: NgForm) {
    this.tournament.date = form.value.date;
    this.tournament.location = form.value.location;
    this.tournament.name = form.value.name;

    if (this.editingMode) {
      this.fencingService.updateTournament(this.tournament);
    } else {
      this.fencingService.saveNewTournament(this.tournament);
    }
  }

  cancelEditMode(){
    this.fencingService.tournamentEditing.next(false);
  }

}
