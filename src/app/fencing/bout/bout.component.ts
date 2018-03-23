import { Component, OnInit } from '@angular/core';
import {BoutModel} from '../../models/bout.model';
import {FencingService} from '../fencing.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-bout',
  templateUrl: './bout.component.html',
  styleUrls: ['./bout.component.css']
})
export class BoutComponent implements OnInit {

  bout: BoutModel = new BoutModel();


  constructor(private fencingService: FencingService) { }

  ngOnInit() {
    this.fencingService.boutChanged.subscribe(res => {
      this.bout = res;
    });
  }

  addBout(form: NgForm){
    this.bout.opponent = form.value.opponent;
    this.bout.opponentScore = form.value.opponentScore;
    this.bout.yourScore = form.value.yourScore;
    this.bout.boutType = form.value.boutType;
    this.bout.notes = form.value.notes;

    this.fencingService.saveNewBout(this.bout);
  }

}
