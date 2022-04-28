import { LocationGeocodedLocation } from "expo-location";
import { MomentInput } from "moment";


export interface Event {

  id: any;

  name: {
    fi?: String;
    en?: String;
    sv?: String;
    sh?: String;
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

    description: {
        intro: String,
        body: String,

        images: [
            url: string | any,
            copyright_holder: String,
            media_id: Number,
            license_type: {
                id: Number,
                name: string
            }
        ]
    }

    tags?: {
        tag: [id: Number, name: String]
    }
  
  event_dates: {
    starting_day: string | MomentInput ;
    ending_day: string | MomentInput; 
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
