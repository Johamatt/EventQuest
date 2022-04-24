
import { EventsAction, eventsAction } from "../actions"
import { EventsState, Event } from "../models"


const initialState = {
    events: {} as Event
}


const eventsReducer = (state: EventsState = initialState, action: EventsAction) => {

    switch(action.type) {
        case 'ON_UPDATE_EVENT':
        return {
            ...state,
            event: action.payload
        }

        default:
            return state
    }

}

export {eventsReducer}