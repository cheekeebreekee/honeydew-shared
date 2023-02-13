"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../constants");
const logger_1 = require("../../../utils/logger");
exports.default = (keyParticle) => {
    const query = {
        TableName: constants_1.ENV.ACCUTANE_TASKS_TABLE,
        FilterExpression: "begins_with(compositeKey, :id)",
        ExpressionAttributeValues: {
            ":id": keyParticle,
        },
    };
    (0, logger_1.logInfo)("DynamoDB query", query);
    return query;
};
//# sourceMappingURL=get-all.js.map