import { EventsAction } from "../actions"
import { EventsState } from "../models"
import {Event} from '../models/index'

const initialState : EventsState = {
    events: {} as Array<Event>,
    filteredEvents: {} as Array<Event>
}


const eventsReducer = (state: EventsState = initialState, action: EventsAction) => {

    switch(action.type) {
        case 'ON_UPDATE_ALL_EVENTS':
        return {
            ...state,
            events: action.payload
        }
        case 'ON_EVENT_FILTER':
            return {
                ...state,
                filteredEvents: action.payload
            }

        default:
            return state
    }

}

export {eventsReducer}