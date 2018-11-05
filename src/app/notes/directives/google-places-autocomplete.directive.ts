import { Directive, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';
declare const google: any;

@Directive({
  selector: '[appGooglePlacesAutocomplete]'
})
export class GooglePlacesAutocompleteDirective implements OnInit {
  @Output()
  placeSelected = new EventEmitter<any>();
  private element: HTMLInputElement;

  constructor(private elementRef: ElementRef) {
    this.element = elementRef.nativeElement;
  }

  ngOnInit() {
    const autocomplete = new google.maps.places.Autocomplete(this.element);

    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      this.placeSelected.emit(this.getFormattedAddress(autocomplete.getPlace()));
    });
  }

  private getFormattedAddress(place) {
    const locationObject = {};
    const placeObject = {
      phone_number: place.international_phone_number || null,
      name: place.name || null,
      place_id: place.place_id,
      rating: place.rating || null,
      types: place.types || null,
      vicinity: place.vicinity || null,
      website: place.website || null
    };

    locationObject['place'] = placeObject;
    locationObject['lat'] = place.geometry.location.lat();
    locationObject['lng'] = place.geometry.location.lng();
    locationObject['url'] = place.url;

    for (const i in place.address_components) {
      if (place.address_components.hasOwnProperty(i)) {
        const item = place.address_components[i];

        locationObject['formatted_address'] = place.formatted_address;
        if (item['types'].indexOf('locality') > -1) {
          locationObject['locality'] = item['long_name'];
        } else if (item['types'].indexOf('administrative_area_level_1') > -1) {
          locationObject['admin_area_l1'] = item['short_name'];
        } else if (item['types'].indexOf('street_number') > -1) {
          locationObject['street_number'] = item['short_name'];
        } else if (item['types'].indexOf('route') > -1) {
          locationObject['route'] = item['long_name'];
        } else if (item['types'].indexOf('country') > -1) {
          locationObject['country'] = item['long_name'];
          locationObject['country_code'] = item['short_name'];
        } else if (item['types'].indexOf('postal_code') > -1) {
          locationObject['postal_code'] = item['short_name'];
        }
      }
    }

    return locationObject;
  }
}
