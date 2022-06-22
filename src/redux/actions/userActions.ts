import { LocationGeocodedLocation } from "expo-location";
import { Dispatch } from "react";

import AsyncStorage from '@react-native-async-storage/async-storage' // 

export interface UpdateLocationAction {
    readonly type: 'ON_UPDATE_LOCATION',
    payload: LocationGeocodedLocation
}

export interface UpdateLanguage {
    readonly type: 'ON_UPDATE_LANGUAGE',
    payload: String
}

export interface UserErrorAction {
    readonly type: 'ON_USER_ERROR',
    payload: any
}

export type UserAction = UpdateLocationAction | UserErrorAction | UpdateLanguage

export const ON_UPDATE_LANGUAGE = (language: String) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
         
            await AsyncStorage.setItem("user_language", JSON.stringify(language))
            dispatch({
                type: 'ON_UPDATE_LANGUAGE',
                payload: language
            })
        } catch(error) {
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }
}


export const ON_UPDATE_LOCATION = (location: LocationGeocodedLocation) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({
                type: 'ON_UPDATE_LOCATION',
                payload: location
            })
        } catch(error) {
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
        }
    }

