import axios from "axios";
import { ENV } from "src/shared/constants";
import { ReferralFactoryUser } from "src/types/ReferralFactoryAPI";
import { logInfo } from "src/utils/logger";

export async function getUserByCode(code: string) {
  logInfo("Getting Referral Factory user by code ID", {
    code,
  });

  const user = await axios.get<{ data: ReferralFactoryUser[] }>(
    `${ENV.REFERRAL_FACTORY_BASE_URL}/users?filters[0][field]=code&filters[0][value]=${code}`,
    { headers: { Authorization: `Bearer ${ENV.REFERRAL_FACTORY_API_KEY}` } }
  );
  logInfo("User found", user.data);

  return user.data.data;
}
