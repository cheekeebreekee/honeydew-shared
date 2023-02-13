"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProviderAccount = void 0;
const aws_sdk_1 = require("aws-sdk");
const constants_1 = require("../../constants");
const logger_1 = require("../../utils/logger");
const cognitoIdentityServiceProvider = new aws_sdk_1.CognitoIdentityServiceProvider();
const createProviderAccount = async (provider, password) => {
    const fullName = `${provider.firstName} ${provider.lastName}`;
    (0, logger_1.logInfo)(`Creating Cognito account for provider "${fullName}"`);
    await cognitoIdentityServiceProvider
        .signUp({
        Username: provider.email,
        Password: password,
        ClientId: constants_1.ENV.COGNITO_APP_CLIENT_ID,
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
    (0, logger_1.logInfo)(`Account created. Assigning to "providers" group`);
    await cognitoIdentityServiceProvider
        .adminAddUserToGroup({
        GroupName: "providers",
        UserPoolId: constants_1.ENV.COGNITO_USER_POOL_ID,
        Username: provider.email,
    })
        .promise();
    (0, logger_1.logInfo)(`Account assigned. Comfirming sign-up`);
    await cognitoIdentityServiceProvider
        .adminConfirmSignUp({
        Username: provider.email,
        UserPoolId: constants_1.ENV.COGNITO_USER_POOL_ID,
    })
        .promise();
    (0, logger_1.logInfo)(`Sign-up confirmed. Verify account's email`);
    await cognitoIdentityServiceProvider
        .adminUpdateUserAttributes({
        Username: provider.email,
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
exports.createProviderAccount = createProviderAccount;
//# sourceMappingURL=index.js.map