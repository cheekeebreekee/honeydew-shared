import axios from "axios";
import { ENV } from "src/constants";
import { logInfo } from "src/utils/logger";
import {
  CalendlyCollection,
  CalendlyEventType,
} from "../../../types/CalendlyAPI";

async function nextPage(
  userUri: string,
  nextPageUrl?: string
): Promise<CalendlyEventType[]> {
  const { data } = await axios.get<CalendlyCollection<CalendlyEventType>>(
    nextPageUrl || "https://api.calendly.com/event_types",
    {
      params: {
        organization: ENV.CALENDLY_ORGANIZATION,
        user: userUri,
        active: true,
      },
      headers: {
        Authorization: `Bearer ${ENV.CALENDLY_API_TOKEN}`,
      },
    }
  );

  return [
    ...data.collection,
    ...(data.pagination.next_page
      ? await nextPage(userUri, data.pagination.next_page)
      : []),
  ];
}

export async function getEventTypesByUser(userUri: string) {
  logInfo("Getting Calendly event types related to user", {
    userUri,
  });
  const calendlyEvents = await nextPage(userUri);
  logInfo("Event types found", calendlyEvents);
  return calendlyEvents;
}
