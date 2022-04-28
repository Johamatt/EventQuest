
import { eventsAction } from "../actions"
import { EventsState, Event } from "../models"


const initialState = {
    events: {} 
}


const eventsReducer = (state: EventsState = initialState, action: eventsAction) => {

    switch(action.type) {
        case 'ON_UPDATE_EVENTS':
        return {
            ...state,
            events: action.payload
        }

        default:
            return state
    }

}

export {eventsReducer}