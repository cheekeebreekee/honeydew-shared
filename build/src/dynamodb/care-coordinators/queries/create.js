"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../constants");
const logger_1 = require("../../../utils/logger");
exports.default = (careCoordinator) => {
    const query = {
        TableName: constants_1.ENV.CARE_COORDINATORS_TABLE,
        Item: careCoordinator,
    };
    (0, logger_1.logInfo)("DynamoDB query", query);
    return query;
};
//# sourceMappingURL=create.js.map