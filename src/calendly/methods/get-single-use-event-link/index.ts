import axios from "axios";
import { ENV } from "src/shared/constants";
import { logInfo } from "src/utils/logger";
import { CalendlySingleUseLinkResponse } from "../../../types/CalendlyAPI";

export async function getSingleUseEventLink(eventUri: string) {
  logInfo("Getting Calendly single use link", {
    eventUri,
  });
  const { data } = await axios.post<CalendlySingleUseLinkResponse>(
    "https://api.calendly.com/scheduling_links",
    {
      max_event_count: 1,
      owner: eventUri,
      owner_type: "EventType",
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ENV.CALENDLY_API_TOKEN}`,
      },
    }
  );
  logInfo("Calendly single use link obtained", data);
  return data;
}
