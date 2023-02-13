"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../constants");
const logger_1 = require("../../../utils/logger");
exports.default = (id, patientId) => {
    const query = {
        TableName: constants_1.ENV.ACCUTANE_DOCUMENTS_TABLE,
        Key: {
            id,
            compositeKey: `${patientId}_${id}`,
        },
    };
    (0, logger_1.logInfo)("DynamoDB query", query);
    return query;
};
//# sourceMappingURL=get.js.map