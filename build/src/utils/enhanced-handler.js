"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enhancedLambdaConsoleHandler = exports.enhancedWebhookHandler = exports.enhancedApiHandler = void 0;
const logger_1 = require("./logger");
const http_response_1 = require("./http-response");
const enhancedApiHandler = (handler) => async (event, context, callback) => {
    (0, logger_1.logInfo)("Event received", event);
    let response;
    try {
        response = await handler(event, context, callback);
    }
    catch (error) {
        (0, logger_1.logError)("Lambda exit with error", error);
        response = http_response_1.HttpResponse.serverError(error);
    }
    (0, logger_1.logInfo)("Lambda exit", response);
    return response;
};
exports.enhancedApiHandler = enhancedApiHandler;
const enhancedWebhookHandler = (handler) => async (event, context, callback) => {
    (0, logger_1.logInfo)("Webhook event received", event);
    let response;
    try {
        response = await handler(event, context, callback);
        (0, logger_1.logInfo)("Lambda exit", { response });
    }
    catch (error) {
        (0, logger_1.logError)("Lambda exit with error", error);
    }
    // Respond with only success to prevent webhooks detach
    return http_response_1.HttpResponse.success();
};
exports.enhancedWebhookHandler = enhancedWebhookHandler;
const enhancedLambdaConsoleHandler = (handler) => async (event, context, callback) => {
    (0, logger_1.logInfo)("Event received", event);
    let response;
    try {
        response = await handler(event, context, callback);
    }
    catch (error) {
        (0, logger_1.logError)("Lambda exit with error", error);
        response = http_response_1.HttpResponse.serverError(error);
    }
    (0, logger_1.logInfo)("Lambda exit", response);
    return response;
};
exports.enhancedLambdaConsoleHandler = enhancedLambdaConsoleHandler;
//# sourceMappingURL=enhanced-handler.js.map