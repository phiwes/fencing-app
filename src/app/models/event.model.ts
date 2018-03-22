import {BoutModel} from './bout.model';

export class EventModel {
  id: string;
  weapon: string;
  category: string;
  gender: string;
  bouts: BoutModel[];
}
