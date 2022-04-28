import { Event } from "../models";

import { Dispatch } from "react";


import axios from "axios";

export interface EventsAction {
    readonly type: 'ON_UPDATE_EVENTS',
    payload: any,

}

export interface EventErrorAction {
    readonly type: 'ON_EVENT_ERROR',
    payload: any
}

export type eventsAction = EventsAction | EventErrorAction

export const ON_UPDATE_EVENTS = () => {
    return async (dispatch: Dispatch<eventsAction>) => {
        try {

            const res = await axios.get('https://cors-anywhere.herokuapp.com/https://open-api.myhelsinki.fi/v1/events/', {
                headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Content-Type': 'application/json',
                }})

            if(!res) {
                dispatch({
                    type: 'ON_EVENT_ERROR',
                    payload: 'error'
                })
                
                
                
                
                //save eventdata to store
            } else {

                  
                dispatch({
                    type: 'ON_UPDATE_EVENTS',
                    payload: res.data.data
                })
                
            }
         
        } catch(error) {
            dispatch({
                type: 'ON_EVENT_ERROR',
                payload: error
            })
        }
        }

    }
