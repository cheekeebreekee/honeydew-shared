import { CognitoIdentityServiceProvider } from "aws-sdk";
import { ENV } from "src/constants";
import { CognitoUserCustom } from "src/types/Cognito";
import { logError, logInfo } from "../../utils/logger";

const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();

export const getUserByAccessToken = async (token: string) => {
  try {
    logInfo(`Getting Cognito account by access token`);
    const cognitoUser = await cognitoIdentityServiceProvider
      .getUser({
        AccessToken: token,
      })
      .promise();
    logInfo("Getting group assigned to Cognito user");
    const groupsList = await cognitoIdentityServiceProvider
      .adminListGroupsForUser({
        UserPoolId: ENV.COGNITO_USER_POOL_ID,
        Username: cognitoUser.Username,
      })
      .promise();
    logInfo("Cognito user found", cognitoUser);
    logInfo("Cognito groups list", groupsList);
    if (!groupsList.Groups) {
      throw new Error("Cognito user doesn't have any assigned group");
    }
    if (groupsList.Groups.length > 1) {
      throw new Error("Cognito user can't have more than one assigned group");
    }

    const result: CognitoUserCustom = {
      username: cognitoUser.Username,
      group: groupsList.Groups[0].GroupName as string,
      ...cognitoUser.UserAttributes.reduce(
        (acc, el) => ({
          ...acc,
          [el.Name]: el.Value,
        }),
        {}
      ),
    };

    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    logError("Error during getting Cognito user by access token", e);
    throw e;
  }
};
