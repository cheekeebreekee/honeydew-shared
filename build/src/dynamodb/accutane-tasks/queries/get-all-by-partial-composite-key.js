"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../constants");
const logger_1 = require("../../../utils/logger");
exports.default = (partialCompositeKey) => {
    const query = {
        TableName: constants_1.ENV.ACCUTANE_TASKS_TABLE,
        FilterExpression: "begins_with(compositeKey, :COMPOSITE_KEY_PARTIAL)",
        ExpressionAttributeValues: {
            ":COMPOSITE_KEY_PARTIAL": partialCompositeKey,
        },
    };
    (0, logger_1.logInfo)("DynamoDB query", query);
    return query;
};
//# sourceMappingURL=get-all-by-partial-composite-key.js.map