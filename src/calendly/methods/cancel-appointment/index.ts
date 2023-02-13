import axios from "axios";
import { ENV } from "src/constants";
import { logInfo } from "src/utils/logger";

export async function cancelAppointment(uuid: string) {
  logInfo("Cancelling Calendly event", {
    uuid,
  });
  try {
    const { data } = await axios.post(
      `https://api.calendly.com/scheduled_events/${uuid}/cancellation`,
      {
        reason: "[Honeydew Bot] Another initial appointment scheduled",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ENV.CALENDLY_API_TOKEN}`,
        },
      }
    );
    logInfo("Calendly appointment cancellation response", data);
    return data;
  } catch (e: any) {
    if (e.response.status === 403) {
      logInfo(
        "Unable to cancel an appointment for some reason",
        e.response.data
      );
      return null;
    }
    logInfo("Error occured", e);
    throw new Error("Error while cancelling an appointment");
  }
}
