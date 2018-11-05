import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  lat: number;
  lng: number;

  constructor(private http: HttpClient) {}

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
  }

  getPlaceDetails(placeId: string) {
    // tslint:disable-next-line:max-line-length
    const placeDetailUrl = `https://maps.googleapis.com/maps/api/place/details/json?key=${environment.googleMapsKey}&placeid=${placeId}&fields=name,type,international_phone_number,opening_hours,website,price_level,rating,review`;

    return this.http.get(placeDetailUrl);
  }
}
