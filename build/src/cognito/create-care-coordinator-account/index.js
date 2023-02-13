"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCareCoordinatorAccount = void 0;
const aws_sdk_1 = require("aws-sdk");
const constants_1 = require("../../constants");
const logger_1 = require("../../utils/logger");
const cognitoIdentityServiceProvider = new aws_sdk_1.CognitoIdentityServiceProvider();
const createCareCoordinatorAccount = async (careCoordinator, password) => {
    const fullName = `${careCoordinator.firstName} ${careCoordinator.lastName}`;
    (0, logger_1.logInfo)(`Creating Cognito account for care coordinator "${fullName}"`);
    await cognitoIdentityServiceProvider
        .signUp({
        Username: careCoordinator.email,
        Password: password,
        ClientId: constants_1.ENV.COGNITO_APP_CLIENT_ID,
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
    (0, logger_1.logInfo)(`Account created. Assigning to "care-coordinators" group`);
    await cognitoIdentityServiceProvider
        .adminAddUserToGroup({
        GroupName: "care-coordinators",
        UserPoolId: constants_1.ENV.COGNITO_USER_POOL_ID,
        Username: careCoordinator.email,
    })
        .promise();
    (0, logger_1.logInfo)(`Account assigned. Comfirming sign-up`);
    await cognitoIdentityServiceProvider
        .adminConfirmSignUp({
        Username: careCoordinator.email,
        UserPoolId: constants_1.ENV.COGNITO_USER_POOL_ID,
    })
        .promise();
    (0, logger_1.logInfo)(`Sign-up confirmed. Verify account's email`);
    await cognitoIdentityServiceProvider
        .adminUpdateUserAttributes({
        Username: careCoordinator.email,
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
exports.createCareCoordinatorAccount = createCareCoordinatorAccount;
//# sourceMappingURL=index.js.map