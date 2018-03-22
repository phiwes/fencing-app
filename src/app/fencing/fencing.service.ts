import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subject } from 'rxjs/Subject';
import {TournamentModel} from '../models/tournament.model';
import {EventModel} from '../models/event.model';


@Injectable()
export class FencingService {
  tournamentChanged = new Subject<TournamentModel>();
  tournamentsChanged = new Subject<TournamentModel[]>();

  tournamentId: string;

  tournamentEditing = new Subject<boolean>();
  eventEditing= new Subject<boolean>();
  boutEditing= new Subject<boolean>();

  tournamentEditingId = new Subject<string>();

  private tournaments: TournamentModel[] = [];

  constructor(private db: AngularFirestore) {}

  fetchTournaments() {
    this.db
      .collection('tournaments')
      .snapshotChanges()
      .map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            name: doc.payload.doc.data().name,
            location: doc.payload.doc.data().location,
            date: doc.payload.doc.data().date,
            events: doc.payload.doc.data().events
          };
        });
      })
      .subscribe((tournaments: TournamentModel[]) => {
        this.tournaments = tournaments;
        console.log("this is the size of tournaments: " + this.tournaments.length);
        this.tournamentsChanged.next([...this.tournaments]);
      });
  }

  fetchTournamentById(id: string){
    this.db
      .doc<TournamentModel>('tournaments/' + id)
      .valueChanges().subscribe((tournament: TournamentModel) => {
        console.log("this is the size of tournaments: " + this.tournaments.length);
        this.tournamentChanged.next(tournament);
        this.tournamentEditingId.next(id);
      });
  }



  saveNewTournament(tournament: TournamentModel){
    console.log("this is the tournament name: " + tournament.name);
    var data = JSON.parse(JSON.stringify(tournament));
    console.log("this is the data: " + data);
    this.db.collection('tournaments').add(data);
  }

  updateTournament(tournament: TournamentModel, id: string){
    this.db.doc('tournaments/' + id).update(tournament);
  }

  saveNewEvent(event: EventModel){
    var data = JSON.parse(JSON.stringify(event));
    this.db.collection('tournaments').doc(this.tournamentId).collection('events').add(data);
  }

}
