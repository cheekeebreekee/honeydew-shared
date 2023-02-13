"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByAccessToken = void 0;
const aws_sdk_1 = require("aws-sdk");
const constants_1 = require("src/constants");
const logger_1 = require("../../utils/logger");
const cognitoIdentityServiceProvider = new aws_sdk_1.CognitoIdentityServiceProvider();
const getUserByAccessToken = async (token) => {
    try {
        (0, logger_1.logInfo)(`Getting Cognito account by access token`);
        const cognitoUser = await cognitoIdentityServiceProvider
            .getUser({
            AccessToken: token,
        })
            .promise();
        (0, logger_1.logInfo)("Getting group assigned to Cognito user");
        const groupsList = await cognitoIdentityServiceProvider
            .adminListGroupsForUser({
            UserPoolId: constants_1.ENV.COGNITO_USER_POOL_ID,
            Username: cognitoUser.Username,
        })
            .promise();
        (0, logger_1.logInfo)("Cognito user found", cognitoUser);
        (0, logger_1.logInfo)("Cognito groups list", groupsList);
        if (!groupsList.Groups) {
            throw new Error("Cognito user doesn't have any assigned group");
        }
        if (groupsList.Groups.length > 1) {
            throw new Error("Cognito user can't have more than one assigned group");
        }
        const result = {
            username: cognitoUser.Username,
            group: groupsList.Groups[0].GroupName,
            ...cognitoUser.UserAttributes.reduce((acc, el) => ({
                ...acc,
                [el.Name]: el.Value,
            }), {}),
        };
        return result;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (e) {
        (0, logger_1.logError)("Error during getting Cognito user by access token", e);
        throw e;
    }
};
exports.getUserByAccessToken = getUserByAccessToken;
//# sourceMappingURL=index.js.map