import { CognitoIdentityServiceProvider } from "aws-sdk";
import { EnrollmentCoordinator } from "src/types/EnrollmentCoordinator";
import { ENV } from "../../constants";
import { logInfo } from "../../utils/logger";

const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();

export const createEnrollmentCoordinatorAccount = async (
  enrollmentCoordinator: EnrollmentCoordinator,
  password: string
) => {
  const fullName = `${enrollmentCoordinator.firstName} ${enrollmentCoordinator.lastName}`;

  logInfo(`Creating Cognito account for enrollment coordinator "${fullName}"`);

  await cognitoIdentityServiceProvider
    .signUp({
      Username: enrollmentCoordinator.email,
      Password: password,
      ClientId: ENV.COGNITO_APP_CLIENT_ID,
      ClientMetadata: {
        fullName,
        userId: enrollmentCoordinator.id,
      },
      UserAttributes: [
        {
          Name: "custom:fullName",
          Value: fullName,
        },
        {
          Name: "custom:userId",
          Value: enrollmentCoordinator.id,
        },
      ],
    })
    .promise();

  logInfo(`Account created. Assigning to "enrollment-coordinators" group`);

  await cognitoIdentityServiceProvider
    .adminAddUserToGroup({
      GroupName: "enrollment-coordinators",
      UserPoolId: ENV.COGNITO_USER_POOL_ID,
      Username: enrollmentCoordinator.email,
    })
    .promise();

  logInfo(`Account assigned. Comfirming sign-up`);

  await cognitoIdentityServiceProvider
    .adminConfirmSignUp({
      Username: enrollmentCoordinator.email,
      UserPoolId: ENV.COGNITO_USER_POOL_ID,
    })
    .promise();

  logInfo(`Sign-up confirmed. Verify account's email`);

  await cognitoIdentityServiceProvider
    .adminUpdateUserAttributes({
      Username: enrollmentCoordinator.email,
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
