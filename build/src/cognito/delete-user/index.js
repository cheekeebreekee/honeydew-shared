"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = void 0;
const aws_sdk_1 = require("aws-sdk");
const constants_1 = require("../../constants");
const logger_1 = require("../../utils/logger");
const cognitoIdentityServiceProvider = new aws_sdk_1.CognitoIdentityServiceProvider();
const deleteUser = async (email) => {
    (0, logger_1.logInfo)(`Deleting Cognito account with email "${email}"`);
    await cognitoIdentityServiceProvider
        .adminDeleteUser({
        UserPoolId: constants_1.ENV.COGNITO_USER_POOL_ID,
        Username: email,
    })
        .promise();
    (0, logger_1.logInfo)("Account has been deleted successfully");
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=index.js.map