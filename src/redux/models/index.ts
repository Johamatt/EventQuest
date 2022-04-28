import { LocationGeocodedLocation } from "expo-location";


export interface Event {

  id: any;

  name: {
    nameFi: String;
    nameEn?: String;
    nameSv?: String;
    nameZh?: String;
  }

  source_type: {
      id: Number,
      name: String
  }

  info_url?: String

  modified_at?: String

  location?: { 
      lat: Number; 
      lon: Number;

      address?: {
          street_address?: String
          postal_code?: String
          locality?: String
          neighbouthood?: String
      }
    };

    description?: {
        intro: String,
        body: String,

        images?: {
            url: String,
            copyright_holder: String
            license_type: {
                id: Number,
                name: String
            }
            media_id: Number
        }
    }

    tags?: {
        tag: [id: Number, name: String]
    }

  event_dates?: {
    startingDay: String;
    endingDay: String;
    additional_description: any
  };
}


export interface UserState {
    location: LocationGeocodedLocation,
    language: String,
    error: String | undefined
}

export interface EventsState {
    events: {}

}
