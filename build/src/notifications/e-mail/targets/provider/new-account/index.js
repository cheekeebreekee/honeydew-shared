"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newAccount = void 0;
const aws_sdk_1 = require("aws-sdk");
const logger_1 = require("../../../../../utils/logger");
const dynamodb_1 = require("../../../../../dynamodb");
const new_provider_account_1 = require("../../../templates/new-provider-account");
const sesPublisher = new aws_sdk_1.SES({ region: "us-east-1" });
const newAccount = async (payload, password) => {
    (0, logger_1.logInfo)("Sending email message to provider about new account");
    const provider = typeof payload === "string"
        ? await dynamodb_1.DynamoDBService.providers.get(payload)
        : payload;
    (0, logger_1.logInfo)("Provider to notify", provider);
    const query = (0, new_provider_account_1.newProviderAccountEmailTemplate)(provider, password);
    await sesPublisher.sendEmail(query).promise();
    (0, logger_1.logInfo)("Provider notified successfully");
};
exports.newAccount = newAccount;
//# sourceMappingURL=index.js.map