import { CognitoIdentityServiceProvider } from "aws-sdk";
import { ENV } from "../../shared/constants";
import { logInfo } from "../../utils/logger";

const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();

export const confirmAccount = async (email: string) => {
  logInfo(`Confirming patient's Cognito account`, {
    email,
  });

  await cognitoIdentityServiceProvider
    .adminConfirmSignUp({
      UserPoolId: ENV.COGNITO_USER_POOL_ID,
      Username: email,
    })
    .promise();

  await cognitoIdentityServiceProvider
    .adminUpdateUserAttributes({
      UserPoolId: ENV.COGNITO_USER_POOL_ID,
      Username: email,
      UserAttributes: [
        {
          Name: "email_verified",
          Value: "true",
        },
      ],
    })
    .promise();

  logInfo(`Account confirmed successfully`);
};
