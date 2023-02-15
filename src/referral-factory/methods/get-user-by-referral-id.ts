import axios from "axios";
import { ENV } from "src/shared/constants";
import { ReferralFactoryUser } from "src/types/ReferralFactoryAPI";
import { logInfo } from "src/utils/logger";

export async function getUserByReferralId(referralId: string) {
  logInfo("Getting Referral Factory user by referral ID", {
    referralId,
  });

  const user = await axios.get<ReferralFactoryUser>(
    `${ENV.REFERRAL_FACTORY_BASE_URL}/users/${referralId}`,
    { headers: { Authorization: `Bearer ${ENV.REFERRAL_FACTORY_API_KEY}` } }
  );
  logInfo("User found", user.data);

  return user;
}
