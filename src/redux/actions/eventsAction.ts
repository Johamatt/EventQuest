import { Event, Filter } from "../models";

import { Dispatch } from "react";
import moment from "moment";

import axios from "axios";

export interface EventsUpdateAllAction {
  readonly type: "ON_UPDATE_ALL_EVENTS";
  payload: any;
}

export interface EventErrorAction {
  readonly type: "ON_EVENT_ERROR";
  payload: any;
}

export interface EventsFilterAction {
  readonly type: "ON_EVENT_FILTER";
  payload: any;
}

export type EventsAction =
  | EventsUpdateAllAction
  | EventErrorAction
  | EventsFilterAction;

export const ON_EVENT_FILTER = (Filter: Filter, Eventlist: any) => {
  return async (dispatch: Dispatch<EventsAction>) => {
    console.log(Filter);
  };
};

export const ON_UPDATE_ALL_EVENTS = () => {
  console.log("hep");
  return async (dispatch: Dispatch<EventsAction>) => {
    try {
      const res = await axios.get("https://open-api.myhelsinki.fi/v1/events/", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods":
            "GET, POST, DELETE, PUT, PATCH, OPTIONS",
          "Access-Control-Allow-Headers":
            "Content-Type, api_key, Authorization",
          "Content-Type": "application/json",
        },
      });
      if (!res) {
        dispatch({
          type: "ON_EVENT_ERROR",
          payload: "error",
        });
      } else {
        // ISO 8601
        let events: Array<Event> = res.data.data.filter(
          (a: { event_dates: { starting_day: string } }) =>
            a.event_dates.starting_day > moment().toISOString()
        );

        dispatch({
          type: "ON_UPDATE_ALL_EVENTS",
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
