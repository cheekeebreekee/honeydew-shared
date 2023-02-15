import AccessToken, { ChatGrant } from "twilio/lib/jwt/AccessToken";
import { ENV } from "../../shared/constants";
import { logInfo } from "../../utils/logger";

export const getAdminAccessToken = (identity: string) => {
  logInfo("Get admin access token for identity", { identity });
  const chatGrant = new ChatGrant({
    serviceSid: ENV.TWILIO_CHAT_SERVICE_SID,
  });

  const token = new AccessToken(
    ENV.TWILIO_ACCOUNT_SID,
    ENV.TWILIO_API_KEY,
    ENV.TWILIO_API_SECRET,
    { identity }
  );

  token.addGrant(chatGrant);

  const jwt = token.toJwt();

  logInfo("Token generated", { token: jwt });
  return jwt;
};
