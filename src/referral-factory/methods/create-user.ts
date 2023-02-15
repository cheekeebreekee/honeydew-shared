import axios from "axios";
import { ENV } from "src/shared/constants";
import { Patient } from "src/types/Patient";
import { ReferralFactoryUser } from "src/types/ReferralFactoryAPI";
import { logError, logInfo } from "src/utils/logger";

export async function createUser(full_name: string, email: string) {
  logInfo("Create user in Referral Factory with payload", {
    first_name: full_name,
    email,
    campaign_id: ENV.REFERRAL_FACTORY_COMPANY_ID,
  });

  const [first_name, ...last_name] = full_name.split(" ");

  try {
    const response = await axios.post<{ data: ReferralFactoryUser }>(
      `${ENV.REFERRAL_FACTORY_BASE_URL}/users`,
      {
        first_name,
        last_name: last_name.length ? last_name.join(" ") : first_name,
        email,
        campaign_id: ENV.REFERRAL_FACTORY_COMPANY_ID,
      },
      { headers: { Authorization: `Bearer ${ENV.REFERRAL_FACTORY_API_KEY}` } }
    );
    logInfo("User created", response.data);

    return response.data.data;
  } catch (e: any) {
    logError(
      "Error durng creation of user in Referral Factory",
      e.response.data
    );
    throw e.response.data;
  }
}
