import { Component, OnInit } from '@angular/core';
import {EventModel} from '../../models/event.model';
import {FencingService} from '../fencing.service';
import {TournamentModel} from '../../models/tournament.model';
import {NgForm} from '@angular/forms';
import {BoutModel} from '../../models/bout.model';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  event: EventModel = new EventModel();
  tournament: TournamentModel = new TournamentModel();
  tournamentId: string;


  constructor(private fencingService: FencingService) { }

  ngOnInit() {
    this.fencingService.tournamentChanged.subscribe(res => {
      this.tournament = res;
    });


    this.fencingService.eventChanged.subscribe(res => {
      this.event = res;
    });
  }

  addEvent(form: NgForm){

    this.event.weapon = form.value.weapon;
    this.event.category = form.value.category;
    this.event.gender = form.value.gender;

    this.fencingService.saveNewEvent(this.event);
  }
}
