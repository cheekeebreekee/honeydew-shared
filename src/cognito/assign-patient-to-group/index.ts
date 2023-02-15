import { CognitoIdentityServiceProvider } from "aws-sdk";
import { ENV } from "../../shared/constants";
import { logInfo } from "../../utils/logger";

const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();

export const assignPatientToGroup = async (email: string) => {
  logInfo(`Assigning patient's Cognito account to group`, {
    email,
  });

  await cognitoIdentityServiceProvider
    .adminAddUserToGroup({
      GroupName: "patients",
      UserPoolId: ENV.COGNITO_USER_POOL_ID,
      Username: email,
    })
    .promise();

  logInfo(`Account assigned successfully`);
};
