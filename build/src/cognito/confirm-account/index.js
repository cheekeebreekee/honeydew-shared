"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmAccount = void 0;
const aws_sdk_1 = require("aws-sdk");
const constants_1 = require("../../constants");
const logger_1 = require("../../utils/logger");
const cognitoIdentityServiceProvider = new aws_sdk_1.CognitoIdentityServiceProvider();
const confirmAccount = async (email) => {
    (0, logger_1.logInfo)(`Confirming patient's Cognito account`, {
        email,
    });
    await cognitoIdentityServiceProvider
        .adminConfirmSignUp({
        UserPoolId: constants_1.ENV.COGNITO_USER_POOL_ID,
        Username: email,
    })
        .promise();
    await cognitoIdentityServiceProvider
        .adminUpdateUserAttributes({
        UserPoolId: constants_1.ENV.COGNITO_USER_POOL_ID,
        Username: email,
        UserAttributes: [
            {
                Name: "email_verified",
                Value: "true",
            },
        ],
    })
        .promise();
    (0, logger_1.logInfo)(`Account confirmed successfully`);
};
exports.confirmAccount = confirmAccount;
//# sourceMappingURL=index.js.map