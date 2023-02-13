import axios from "axios";
import { ENV } from "src/constants";
import { ReferralFactoryUser } from "src/types/ReferralFactoryAPI";
import { logInfo } from "src/utils/logger";

export async function qualifyUserByReferralId(referralId: number) {
  logInfo("Update user in Referral Factory by referral ID", {
    referralId,
  });

  const user = await axios.put<ReferralFactoryUser>(
    `${ENV.REFERRAL_FACTORY_BASE_URL}/users/${referralId}`,
    { qualified: 1 },
    { headers: { Authorization: `Bearer ${ENV.REFERRAL_FACTORY_API_KEY}` } }
  );
  logInfo("User found", user.data);

  return user;
}
