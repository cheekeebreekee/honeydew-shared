import axios from "axios";
import { ENV } from "src/shared/constants";
import {
  CalendlyCollection,
  CalendlyMembership,
  CalendlyUser,
} from "src/types/CalendlyAPI";
import { logError, logInfo } from "src/utils/logger";

async function nextPage(nextPageUrl?: string): Promise<CalendlyUser[]> {
  const { data } = await axios.get<
    CalendlyCollection<CalendlyMembership<CalendlyUser>>
  >(nextPageUrl || "https://api.calendly.com/organization_memberships", {
    params: {
      organization: ENV.CALENDLY_ORGANIZATION,
    },
    headers: {
      Authorization: `Bearer ${ENV.CALENDLY_API_TOKEN}`,
    },
  });

  return [
    ...data.collection.map(({ user }) => user),
    ...(data.pagination.next_page
      ? await nextPage(data.pagination.next_page)
      : []),
  ];
}

export async function getUserByEmail(email: string) {
  logInfo("Getting Calendly users by email", {
    email,
  });
  const calendlyUsers = await nextPage();
  logInfo("All users found", calendlyUsers);
  const foundUser = calendlyUsers.find((user) => user.email === email);
  if (!foundUser) {
    const message = `Cannot find Calendly user with email "${email}"`;
    logError(message);
    throw new Error(message);
  }

  logInfo("Found user", foundUser);

  return foundUser;
}
