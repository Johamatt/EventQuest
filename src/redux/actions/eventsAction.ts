import { Event } from "../models";

import { Dispatch } from "react";
import moment from "moment";

import axios from "axios";

export interface EventsAction {
  readonly type: "ON_UPDATE_EVENTS";
  payload: any;
}

export interface EventErrorAction {
  readonly type: "ON_EVENT_ERROR";
  payload: any;
}

export type eventsAction = EventsAction | EventErrorAction;

export const ON_UPDATE_EVENTS = () => {
  return async (dispatch: Dispatch<eventsAction>) => {
    try {
      const res = await axios.get(
        "https://cors-anywhere.herokuapp.com/https://open-api.myhelsinki.fi/v1/events/",
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );

      if (!res) {
        dispatch({
          type: "ON_EVENT_ERROR",
          payload: "error",
        });

        //save eventdata to store
      } else {
        var now = moment().toISOString();

        // ISO 8601
        //  let events: Array<Event> =  res.data.data.sort((a: { event_dates: { starting_day: any; }; },b: { event_dates: { starting_day: any; }; }) => a.event_dates.starting_day - b.event_dates.starting_day)

        let events: Array<Event> = res.data.data.filter(
          (a: { event_dates: { starting_day: string } }) =>
            a.event_dates.starting_day > now
        );

        // events.sort((a, b) => (a.event_dates.starting_day < b.event_dates.starting_day ? -1 : 1));

        dispatch({
          type: "ON_UPDATE_EVENTS",
          payload: events,
        });
      }
    } catch (error) {
      dispatch({
        type: "ON_EVENT_ERROR",
        payload: error,
      });
    }
  };
};
