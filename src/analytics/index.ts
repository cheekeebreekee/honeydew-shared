// TODO: move to marketing service (as analytics of course)

// import axios from "axios";
// import sha256 from "sha256";
// import {
//   AnalyticsConfig,
//   FacebookAnalyticsCompleteRegistrationEventPayload,
//   FacebookAnalyticsInitiateCheckoutEventPayload,
//   FacebookAnalyticsPageViewEventPayload,
//   FacebookAnalyticsPurchaseEventPayload,
//   FacebookAnalyticsScheduleEventPayload,
//   FB_EVENT_TYPES,
// } from "../types";
// import { logInfo } from "../utils/logger";

// async function sendAppointmentScheduledEvent(
//   payload: FacebookAnalyticsScheduleEventPayload,
//   config: AnalyticsConfig
// ) {
//   logInfo(`Sending "${FB_EVENT_TYPES.SCHEDULE}" event to facebook`);

//   await axios.post(`${config.facebook.baseUrl}/${config.facebook.pixelId}/events`, {
//     data: [
//       {
//         event_name: FB_EVENT_TYPES.SCHEDULE,
//         event_time: Math.trunc(Date.now() / 1000),
//         user_data: {
//           em: sha256(payload.email),
//         },
//       },
//     ],
//     test_event_code:
//       process.env.ENVIRONMENT !== "PRODUCTION" ? config.facebook.testEventCode : undefined,
//     access_token: config.facebook.accessToken,
//   });
//   logInfo("Event submitted successfully");
// }

// async function sendPurchaseEvent(
//   payload: FacebookAnalyticsPurchaseEventPayload,
//   config: AnalyticsConfig
// ) {
//   logInfo(`Sending "${FB_EVENT_TYPES.PURCHASE}" event to facebook`);

//   await axios.post(`${config.facebook.baseUrl}/${config.facebook.pixelId}/events`, {
//     data: [
//       {
//         event_name: FB_EVENT_TYPES.PURCHASE,
//         event_time: Math.trunc(Date.now() / 1000),
//         user_data: {
//           em: sha256(payload.email),
//         },
//         custom_data: {
//           value: payload.amount,
//           currency: "USD",
//         },
//       },
//     ],
//     test_event_code:
//       process.env.ENVIRONMENT !== "PRODUCTION" ? config.facebook.testEventCode : undefined,
//     access_token: config.facebook.accessToken,
//   });
//   logInfo("Event submitted successfully");
// }

// async function sendCompleteRegistrationEvent(
//   payload: FacebookAnalyticsCompleteRegistrationEventPayload,
//   config: AnalyticsConfig
// ) {
//   logInfo(`Sending "${FB_EVENT_TYPES.COMPLETE_REGISTRATION}" event to facebook`);

//   await axios.post(`${config.facebook.baseUrl}/${config.facebook.pixelId}/events`, {
//     data: [
//       {
//         event_name: FB_EVENT_TYPES.COMPLETE_REGISTRATION,
//         event_time: Math.trunc(Date.now() / 1000),
//         user_data: {
//           em: sha256(payload.email),
//         },
//       },
//     ],
//     test_event_code:
//       process.env.ENVIRONMENT !== "PRODUCTION" ? config.facebook.testEventCode : undefined,
//     access_token: config.facebook.accessToken,
//   });
//   logInfo("Event submitted successfully");
// }

// async function sendPageViewEvent(
//   payload: FacebookAnalyticsPageViewEventPayload,
//   config: AnalyticsConfig
// ) {
//   logInfo(`Sending "${FB_EVENT_TYPES.PAGE_VIEW}" event to facebook`);
//   await axios.post(`${config.facebook.baseUrl}/${config.facebook.pixelId}/events`, {
//     data: [
//       {
//         event_name: FB_EVENT_TYPES.PAGE_VIEW,
//         event_time: Math.trunc(Date.now() / 1000),
//         user_data: {
//           fbp: payload.fbp,
//         },
//       },
//     ],
//     access_token: config.facebook.accessToken,
//   });
// }

// async function sendInitiateCheckoutEvent(
//   payload: FacebookAnalyticsInitiateCheckoutEventPayload,
//   config: AnalyticsConfig
// ) {
//   logInfo(`Sending "${FB_EVENT_TYPES.INITIATE_CHECKOUT}" event to facebook`);
//   await axios.post(`${config.facebook.baseUrl}/${config.facebook.pixelId}/events`, {
//     data: [
//       {
//         event_name: FB_EVENT_TYPES.INITIATE_CHECKOUT,
//         event_time: Math.trunc(Date.now() / 1000),
//         user_data: {
//           fbp: payload.fbp,
//         },
//       },
//     ],
//     access_token: config.facebook.accessToken,
//   });
// }

// export const FacebookAnalytics = {
//   sendPageViewEvent,
//   sendInitiateCheckoutEvent,
//   sendCompleteRegistrationEvent,
//   sendAppointmentScheduledEvent,
//   sendPurchaseEvent,
// };
