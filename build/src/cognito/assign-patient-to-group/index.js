"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignPatientToGroup = void 0;
const aws_sdk_1 = require("aws-sdk");
const constants_1 = require("../../constants");
const logger_1 = require("../../utils/logger");
const cognitoIdentityServiceProvider = new aws_sdk_1.CognitoIdentityServiceProvider();
const assignPatientToGroup = async (email) => {
    (0, logger_1.logInfo)(`Assigning patient's Cognito account to group`, {
        email,
    });
    await cognitoIdentityServiceProvider
        .adminAddUserToGroup({
        GroupName: "patients",
        UserPoolId: constants_1.ENV.COGNITO_USER_POOL_ID,
        Username: email,
    })
        .promise();
    (0, logger_1.logInfo)(`Account assigned successfully`);
};
exports.assignPatientToGroup = assignPatientToGroup;
//# sourceMappingURL=index.js.map