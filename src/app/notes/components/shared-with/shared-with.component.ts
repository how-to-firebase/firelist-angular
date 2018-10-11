import { Component, Input } from '@angular/core';
import { Collaborator } from '../../models/collaborator.model';

@Component({
  selector: 'app-note-shared-with',
  templateUrl: './shared-with.component.html'
})
export class SharedWithComponent {
  @Input() collaborators: Collaborator[];
  @Input() noteId: string;

  constructor() { }

}
