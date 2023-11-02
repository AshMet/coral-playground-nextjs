/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

import axios from "axios";

type SendinblueTracker = {
  identify: (
    email: string,
    visitorProperties?: { [property: string]: any }
  ) => void;

  track: (
    eventName: string,
    visitorProperties?: { [property: string]: any },
    eventData?: { id?: string; data?: { [key: string]: any } }
  ) => void;

  page: (pageName: string, properties?: { [property: string]: any }) => void;

  trackLink: (
    link: HTMLElement,
    properties?: { [property: string]: any }
  ) => void;
};

declare global {
  interface Window {
    sendinblue: SendinblueTracker;
  }
}

// Get the env and the feature flag from configuration.
// export const sendinblueEnabled = process.env.SENDINBLUE_ENABLED === '1';
export const sendinblueEnabled = true;

export enum EventName {
  // add here your application events
  EXAMPLE_CREATED = "exampleCreated",
}

export enum PageName {
  // add here page names that you track explicitly
  EXAMPLE_PAGE = "examplePage",
}

// Contact properties, like FIRSTNAME, LASTNAME and custom ones
// Once you know, define those keys and their expected values instead of using `any`
type VisitorProperties = { [property: string]: any };

/**
 * Identifies the visitor user with an email address
 */
export function identify(email: string, visitorProperties?: VisitorProperties) {
  if (sendinblueEnabled) {
    if (process.env.NODE_ENV === "development") {
      console.log("[sendinblue.identify]", email, visitorProperties);
    }
    window.sendinblue.identify(email, visitorProperties);
  }
}

/**
 * Tracks an event
 */
export function track(
  eventName: EventName,
  visitorProperties?: VisitorProperties,
  eventData?: { id?: string; data?: { [key: string]: any } }
) {
  if (sendinblueEnabled) {
    if (process.env.NODE_ENV === "development") {
      console.log(
        "[sendinblue.track]",
        eventName,
        visitorProperties,
        eventData
      );
    }
    window.sendinblue.track(eventName, visitorProperties, eventData);
  }
}

/**
 * Tracks explicitly a page view
 */
export function page(
  eventName: PageName,
  visitorProperties?: VisitorProperties
) {
  if (sendinblueEnabled) {
    if (process.env.NODE_ENV === "development") {
      console.log("[sendinblue.page]", eventName, visitorProperties);
    }
    window.sendinblue.page(eventName, visitorProperties);
  }
}

/**
 * Tracks events serverside
 */
export function serverTrack(
  eventName: EventName,
  email: string,
  {
    properties = {},
    eventData = {},
  }: {
    properties?: VisitorProperties;
    eventData?: { [key: string]: string };
  } = {}
) {
  return axios.post(
    "https://in-automate.brevo.com/api/v2/trackEvent",
    {
      email,
      event: eventName,
      properties,
      eventdata: eventData,
    },
    {
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "ma-key": process.env.BREVO_MA_KEY as string,
      },
    }
  );
}
