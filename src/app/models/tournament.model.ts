import {EventModel} from './event.model';

export class TournamentModel {
  id: string;
  name: string;
  location: string;
  date?: Date;
  events: EventModel[];
}
