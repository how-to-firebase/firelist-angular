import { Place } from './place.model';

export class NoteLocation {
  admin_area_l1: string;
  country: string;
  country_code: string;
  formatted_address: string;
  lat: number;
  lng: number;
  locality: string;
  place: Place;
  postal_code?: string;
  route: string;
  street_number?: string;
  url: string;
}
