import { CognitoIdentityServiceProvider } from "aws-sdk";
import { ENV } from "../../constants";
import { Provider } from "../../types/Provider";
import { logInfo } from "../../utils/logger";

const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();

export const createProviderAccount = async (
  provider: Provider,
  password: string
) => {
  const fullName = `${provider.firstName} ${provider.lastName}`;

  logInfo(`Creating Cognito account for provider "${fullName}"`);

  await cognitoIdentityServiceProvider
    .signUp({
      Username: provider.email,
      Password: password,
      ClientId: ENV.COGNITO_APP_CLIENT_ID,
      ClientMetadata: {
        fullName,
        userId: provider.id,
      },
      UserAttributes: [
        {
          Name: "custom:fullName",
          Value: fullName,
        },
        {
          Name: "custom:userId",
          Value: provider.id,
        },
      ],
    })
    .promise();

  logInfo(`Account created. Assigning to "providers" group`);

  await cognitoIdentityServiceProvider
    .adminAddUserToGroup({
      GroupName: "providers",
      UserPoolId: ENV.COGNITO_USER_POOL_ID,
      Username: provider.email,
    })
    .promise();

  logInfo(`Account assigned. Comfirming sign-up`);

  await cognitoIdentityServiceProvider
    .adminConfirmSignUp({
      Username: provider.email,
      UserPoolId: ENV.COGNITO_USER_POOL_ID,
    })
    .promise();

  logInfo(`Sign-up confirmed. Verify account's email`);

  await cognitoIdentityServiceProvider
    .adminUpdateUserAttributes({
      Username: provider.email,
      UserPoolId: ENV.COGNITO_USER_POOL_ID,
      UserAttributes: [
        {
          Name: "email_verified",
          Value: "true",
        },
      ],
    })
    .promise();

  logInfo(`Email verified. Account creation completed`);
};
