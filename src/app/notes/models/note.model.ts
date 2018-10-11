import { Collaborator } from './collaborator.model';
import { Todo } from './todo.model';

export class Note {
  id?: string;
  title: string;
  description?: string;
  dueDate?: any;
  location?: string;
  createdAt: any;
  createdBy?: any;
  photoURL: string;
  owner: string;
  archived?: boolean;
  todos?: Todo[];
  collaborators?: Object;
  sharedWith?: Collaborator[];
}
