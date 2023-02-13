"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProviderByEmail = void 0;
const dynamodb_1 = require("../dynamodb");
const logger_1 = require("./logger");
async function getProviderByEmail(email) {
    const providers = await dynamodb_1.DynamoDBService.providers.getAll();
    const selectedProvider = providers.find((provider) => provider.email === email);
    if (!selectedProvider) {
        const message = `Cannot find provider by email "${email}"`;
        (0, logger_1.logError)(message);
        throw new Error(message);
    }
    return selectedProvider;
}
exports.getProviderByEmail = getProviderByEmail;
//# sourceMappingURL=get-provider-by-email.js.map