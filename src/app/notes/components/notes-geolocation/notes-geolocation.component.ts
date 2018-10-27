import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../../shared/services/location.service';

@Component({
  selector: 'app-notes-geolocation',
  templateUrl: './notes-geolocation.component.html',
  styleUrls: ['./notes-geolocation.component.scss']
})
export class NotesGeolocationComponent implements OnInit {
  lat: number;
  lng: number;
  constructor(private locationService: LocationService) { }

  ngOnInit() {
    this.getUserLocation();
  }

  private getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
  }
}
