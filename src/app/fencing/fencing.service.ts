import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subject } from 'rxjs/Subject';
import {TournamentModel} from '../models/tournament.model';
import {EventModel} from '../models/event.model';
import {BoutModel} from '../models/bout.model';


@Injectable()
export class FencingService {
  tournamentChanged = new Subject<TournamentModel>();
  tournamentsChanged = new Subject<TournamentModel[]>();

  eventChanged = new Subject<EventModel>();
  eventsChanged = new Subject<EventModel[]>();

  boutChanged = new Subject<BoutModel>();
  boutsChanged = new Subject<BoutModel[]>();

  tournamentId: string;
  eventId: string;

  tournamentEditing = new Subject<boolean>();
  eventEditing= new Subject<boolean>();
  boutEditing= new Subject<boolean>();

  tournamentEditingId = new Subject<string>();
  eventEditingId = new Subject<string>();
  boutEditingId = new Subject<string>();

  private tournaments: TournamentModel[] = [];
  private events: EventModel[] = [];
  private bouts: BoutModel[] = [];

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

  fetchEventsByTournament(){
    this.db.collection('tournaments').doc(this.tournamentId).collection('events').snapshotChanges()
      .map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            weapon: doc.payload.doc.data().weapon,
            gender: doc.payload.doc.data().gender,
            category: doc.payload.doc.data().category,
            bouts: doc.payload.doc.data().bouts
          };
        });
      }).subscribe((events: EventModel[]) => {
      this.events = events;
      this.eventsChanged.next([...this.events]);
    });
  }

  fetchBoutsByEvent(){
    console.log("this is the event id: " + this.eventId);
    this.db.collection('tournaments').doc(this.tournamentId).collection('events').doc(this.eventId).collection('bouts').snapshotChanges()
      .map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            opponent: doc.payload.doc.data().opponent,
            yourScore: doc.payload.doc.data().yourScore,
            opponentScore: doc.payload.doc.data().opponentScore,
            boutType: doc.payload.doc.data().boutType,
            notes: doc.payload.doc.data().notes
          };
        });
      }).subscribe((bouts: BoutModel[]) => {
      this.bouts = bouts;
      this.boutsChanged.next([...this.bouts]);
    });
  };

  saveNewBout(bout: BoutModel){
    let data = JSON.parse(JSON.stringify(bout));
    this.db.collection('tournaments').doc(this.tournamentId).collection('events').doc(this.eventId).collection('bouts').add(data);
    this.bouts.push(bout);
    this.tournamentsChanged.next(this.tournaments);
  }





  saveNewTournament(tournament: TournamentModel){
    console.log("this is the tournament name: " + tournament.name);
    let data = JSON.parse(JSON.stringify(tournament));
    console.log("this is the data: " + data);
    this.db.collection('tournaments').add(data);
    this.tournaments.push(tournament);
    this.tournamentsChanged.next(this.tournaments);
  }

  updateTournament(tournament: TournamentModel){
    this.db.doc('tournaments/' + this.tournamentId).update(tournament);
    this.tournamentId = null;
    this.tournamentEditingId.next(null);
  }

  saveNewEvent(event: EventModel){
    let data = JSON.parse(JSON.stringify(event));
    this.db.collection('tournaments').doc(this.tournamentId).collection('events').add(data);
    this.events.push(event);
    this.eventsChanged.next(this.events);
  }

  deleteTournament(tournament: TournamentModel){
    this.db.collection('tournaments').doc(tournament.id).delete();
  }

  deleteEvent(event: EventModel){
    this.db.collection('tournaments').doc(this.tournamentId).collection('events').doc(event.id).delete();
  }

  deleteBout(bout: BoutModel){
    this.db.collection('tournaments').doc(this.tournamentId).collection('events').doc(this.eventId).collection('bouts').doc(bout.id).delete();
  }
}
