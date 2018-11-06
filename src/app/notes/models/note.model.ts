import { Collaborator } from './collaborator.model';
import { NoteLocation } from './location.model';
import { Todo } from './todo.model';

export class Note {
  id?: string;
  title: string;
  description?: string;
  dueDate?: any;
  location?: string;
  geolocation?: NoteLocation;
  geopoint?: any;
  createdAt: any;
  createdBy?: any;
  photoURL: string;
  owner: string;
  archived?: boolean;
  todos?: Todo[];
  collaborators?: any[];
  sharedWith?: Collaborator[];
  isInvitaionFormEnabled?: boolean;
}
