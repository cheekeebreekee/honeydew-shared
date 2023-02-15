import { CognitoIdentityServiceProvider } from "aws-sdk";
import { ENV } from "../../shared/constants";
import { logInfo } from "../../utils/logger";

const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();

export const deleteUser = async (email: string) => {
  logInfo(`Deleting Cognito account with email "${email}"`);
  await cognitoIdentityServiceProvider
    .adminDeleteUser({
      UserPoolId: ENV.COGNITO_USER_POOL_ID,
      Username: email,
    })
    .promise();
  logInfo("Account has been deleted successfully");
};
