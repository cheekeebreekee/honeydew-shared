"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEnrollmentCoordinatorAccount = void 0;
const aws_sdk_1 = require("aws-sdk");
const constants_1 = require("../../constants");
const logger_1 = require("../../utils/logger");
const cognitoIdentityServiceProvider = new aws_sdk_1.CognitoIdentityServiceProvider();
const createEnrollmentCoordinatorAccount = async (enrollmentCoordinator, password) => {
    const fullName = `${enrollmentCoordinator.firstName} ${enrollmentCoordinator.lastName}`;
    (0, logger_1.logInfo)(`Creating Cognito account for enrollment coordinator "${fullName}"`);
    await cognitoIdentityServiceProvider
        .signUp({
        Username: enrollmentCoordinator.email,
        Password: password,
        ClientId: constants_1.ENV.COGNITO_APP_CLIENT_ID,
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
    (0, logger_1.logInfo)(`Account created. Assigning to "enrollment-coordinators" group`);
    await cognitoIdentityServiceProvider
        .adminAddUserToGroup({
        GroupName: "enrollment-coordinators",
        UserPoolId: constants_1.ENV.COGNITO_USER_POOL_ID,
        Username: enrollmentCoordinator.email,
    })
        .promise();
    (0, logger_1.logInfo)(`Account assigned. Comfirming sign-up`);
    await cognitoIdentityServiceProvider
        .adminConfirmSignUp({
        Username: enrollmentCoordinator.email,
        UserPoolId: constants_1.ENV.COGNITO_USER_POOL_ID,
    })
        .promise();
    (0, logger_1.logInfo)(`Sign-up confirmed. Verify account's email`);
    await cognitoIdentityServiceProvider
        .adminUpdateUserAttributes({
        Username: enrollmentCoordinator.email,
        UserPoolId: constants_1.ENV.COGNITO_USER_POOL_ID,
        UserAttributes: [
            {
                Name: "email_verified",
                Value: "true",
            },
        ],
    })
        .promise();
    (0, logger_1.logInfo)(`Email verified. Account creation completed`);
};
exports.createEnrollmentCoordinatorAccount = createEnrollmentCoordinatorAccount;
//# sourceMappingURL=index.js.map