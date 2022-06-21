
import { EventsAction } from "../actions"
import { EventsState } from "../models"


const initialState = {
    events: {},
    filteredevents: {}
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
                filteredevents: action.payload
            }

        default:
            return state
    }

}

export {eventsReducer}