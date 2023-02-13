"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../constants");
const logger_1 = require("../../../utils/logger");
exports.default = (tasks) => {
    const query = {
        RequestItems: {
            [constants_1.ENV.ACCUTANE_TASKS_TABLE]: tasks.map((task) => ({
                DeleteRequest: {
                    Key: {
                        id: task.id,
                        compositeKey: task.compositeKey,
                    },
                },
            })),
        },
    };
    (0, logger_1.logInfo)("DynamoDB query", query);
    return query;
};
//# sourceMappingURL=delete-all-document-related.js.map