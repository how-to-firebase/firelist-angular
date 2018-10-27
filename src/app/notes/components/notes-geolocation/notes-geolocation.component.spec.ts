import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesGeolocationComponent } from './notes-geolocation.component';

describe('NotesGeolocationComponent', () => {
  let component: NotesGeolocationComponent;
  let fixture: ComponentFixture<NotesGeolocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesGeolocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesGeolocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
