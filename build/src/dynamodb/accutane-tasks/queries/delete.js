"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../constants");
const logger_1 = require("../../../utils/logger");
exports.default = (id, compositeKey) => {
    const query = {
        TableName: constants_1.ENV.ACCUTANE_TASKS_TABLE,
        Key: {
            id,
            compositeKey,
        },
    };
    (0, logger_1.logInfo)("DynamoDB query", query);
    return query;
};
//# sourceMappingURL=delete.js.map