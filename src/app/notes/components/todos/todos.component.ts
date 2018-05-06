import { Component, OnInit, Input } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html'
})
export class TodosComponent implements OnInit {
  @Input() noteId: string;

  private todosCollection: AngularFirestoreCollection<any>;
  todos$: Observable<Todo[]>;
  todosList: Todo[];
  newTodoText = '';

  constructor(
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.todosCollection = this.afs.collection<any>(`notes/${this.noteId}/todos`, ref => ref.orderBy('createdAt'));
    this.todos$ = this.todosCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Todo;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });

    this.todos$.subscribe(items => {
      this.todosList = [...items];
    });
  }

  addTodo() {
    if (this.newTodoText.trim().length) {
      const newTodo: Todo = {
        completed: false,
        title: this.newTodoText,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      };

      this.todosCollection.add(newTodo);
      this.newTodoText = '';
    }
  }

  deleteTodo(e, todo): void {
    e.stopPropagation();

    this.afs.doc<Todo>(`notes/${this.noteId}/todos/${todo.id}`).delete();
  }

}