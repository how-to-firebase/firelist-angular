import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-note-collaborators',
  templateUrl: './note-collaborators.component.html'
})
export class NoteCollaboratorsComponent implements OnInit {
  noteId: any;

  constructor(
    private route: ActivatedRoute
  ) {
    route.params.subscribe((params: Object) => this.noteId = params['id']);
  }

  ngOnInit() {
  }

}
