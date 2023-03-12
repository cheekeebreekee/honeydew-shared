import axios from "axios";
import sha256 from "sha256";
import { AnalyticsConfig, EVENT_TYPES } from "../types";
import { logInfo } from "../utils/logger";

async function sendAppointmentScheduledEvent(email: string, config: AnalyticsConfig) {
  logInfo(`Sending "${EVENT_TYPES.SCHEDULE}" event to facebook`);

  await axios.post(`${config.facebook.baseUrl}/${config.facebook.pixelId}/events`, {
    data: [
      {
        event_name: EVENT_TYPES.SCHEDULE,
        event_time: Math.trunc(Date.now() / 1000),
        user_data: {
          em: sha256(email),
        },
      },
    ],
    test_event_code:
      process.env.ENVIRONMENT !== "PRODUCTION" ? config.facebook.testEventCode : undefined,
    access_token: config.facebook.accessToken
  });
  logInfo("Event submitted successfully");
}

async function sendPurchaseEvent(email: string, amount: number, config: AnalyticsConfig) {
  logInfo(`Sending "${EVENT_TYPES.PURCHASE}" event to facebook`);

  await axios.post(`${config.facebook.baseUrl}/${config.facebook.pixelId}/events`, {
    data: [
      {
        event_name: EVENT_TYPES.PURCHASE,
        event_time: Math.trunc(Date.now() / 1000),
        user_data: {
          em: sha256(email),
        },
        custom_data: {
          value: amount,
          currency: "USD",
        },
      },
    ],
    test_event_code:
      process.env.ENVIRONMENT !== "PRODUCTION" ? config.facebook.testEventCode : undefined,
    access_token: config.facebook.accessToken
  });
  logInfo("Event submitted successfully");
}

async function sendCompleteRegistrationEvent(email: string, config: AnalyticsConfig) {
  logInfo(`Sending "${EVENT_TYPES.COMPLETE_REGISTRATION}" event to facebook`);

  await axios.post(`${config.facebook.baseUrl}/${config.facebook.pixelId}/events`, {
    data: [
      {
        event_name: EVENT_TYPES.COMPLETE_REGISTRATION,
        event_time: Math.trunc(Date.now() / 1000),
        user_data: {
          em: sha256(email),
        },
      },
    ],
    test_event_code:
      process.env.ENVIRONMENT !== "PRODUCTION" ? config.facebook.testEventCode : undefined,
    access_token: config.facebook.accessToken
  });
  logInfo("Event submitted successfully");
}

async function sendPageViewEvent(fbp: string, config: AnalyticsConfig) {
  logInfo(`Sending "${EVENT_TYPES.PAGE_VIEW}" event to facebook`);
  await axios.post(`${config.facebook.baseUrl}/${config.facebook.pixelId}/events`, {
    data: [
      {
        event_name: EVENT_TYPES.PAGE_VIEW,
        event_time: Math.trunc(Date.now() / 1000),
        user_data: {
          fbp,
        },
      },
    ],
    access_token: config.facebook.accessToken
  });
}

async function sendInitiateCheckoutEvent(fbp: string, config: AnalyticsConfig) {
  logInfo(`Sending "${EVENT_TYPES.INITIATE_CHECKOUT}" event to facebook`);
  await axios.post(`${config.facebook.baseUrl}/${config.facebook.pixelId}/events`, {
    data: [
      {
        event_name: EVENT_TYPES.INITIATE_CHECKOUT,
        event_time: Math.trunc(Date.now() / 1000),
        user_data: {
          fbp,
        },
      },
    ],
    access_token: config.facebook.accessToken
  });
}

export const FacebookAnalytics = {
  sendPageViewEvent,
  sendInitiateCheckoutEvent,
  sendCompleteRegistrationEvent,
  sendAppointmentScheduledEvent,
  sendPurchaseEvent,
};
