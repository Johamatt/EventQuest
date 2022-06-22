
import { LocationGeocodedLocation } from 'expo-location';
import { Address } from 'react-native-maps';
import {UserAction} from '../actions';
import { UserState } from '../models';


const initialState: UserState = {
   
    location: {} as LocationGeocodedLocation,
    language: "",
    error: undefined
}


const userReducer = (state: UserState = initialState, action: UserAction) => {

    switch(action.type) {
        case 'ON_UPDATE_LOCATION':
            return{
                ...state,
                location: action.payload
            }
        case 'ON_UPDATE_LANGUAGE':
            return {
                ...state,
                language: action.payload
            }
            default:
                return state;
    }
}

export {userReducer}