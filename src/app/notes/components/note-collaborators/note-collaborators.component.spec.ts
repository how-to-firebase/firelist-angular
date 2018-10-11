import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteCollaboratorsComponent } from './note-collaborators.component';

describe('NoteCollaboratorsComponent', () => {
  let component: NoteCollaboratorsComponent;
  let fixture: ComponentFixture<NoteCollaboratorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteCollaboratorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteCollaboratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
