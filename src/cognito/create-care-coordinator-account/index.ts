import { CognitoIdentityServiceProvider } from "aws-sdk";
import { ENV } from "../../shared/constants";
import { CareCoordinator } from "../../types/CareCoordinator";
import { logInfo } from "../../utils/logger";

const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();

export const createCareCoordinatorAccount = async (
  careCoordinator: CareCoordinator,
  password: string
) => {
  const fullName = `${careCoordinator.firstName} ${careCoordinator.lastName}`;

  logInfo(`Creating Cognito account for care coordinator "${fullName}"`);

  await cognitoIdentityServiceProvider
    .signUp({
      Username: careCoordinator.email,
      Password: password,
      ClientId: ENV.COGNITO_APP_CLIENT_ID,
      ClientMetadata: {
        fullName,
        userId: careCoordinator.id,
      },
      UserAttributes: [
        {
          Name: "custom:fullName",
          Value: fullName,
        },
        {
          Name: "custom:userId",
          Value: careCoordinator.id,
        },
      ],
    })
    .promise();

  logInfo(`Account created. Assigning to "care-coordinators" group`);

  await cognitoIdentityServiceProvider
    .adminAddUserToGroup({
      GroupName: "care-coordinators",
      UserPoolId: ENV.COGNITO_USER_POOL_ID,
      Username: careCoordinator.email,
    })
    .promise();

  logInfo(`Account assigned. Comfirming sign-up`);

  await cognitoIdentityServiceProvider
    .adminConfirmSignUp({
      Username: careCoordinator.email,
      UserPoolId: ENV.COGNITO_USER_POOL_ID,
    })
    .promise();

  logInfo(`Sign-up confirmed. Verify account's email`);

  await cognitoIdentityServiceProvider
    .adminUpdateUserAttributes({
      Username: careCoordinator.email,
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
