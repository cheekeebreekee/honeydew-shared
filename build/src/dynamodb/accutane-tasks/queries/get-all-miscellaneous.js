"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../constants");
const logger_1 = require("../../../utils/logger");
const generateFilterExpression = (employeeId, patientId, documentId) => {
    if (employeeId && patientId && documentId)
        return `begins_with(compositeKey, :id)`;
    return `contains(compositeKey, :employeeId)`;
};
const generateFilterExpressionAttributeValue = (employeeId, patientId, documentId) => {
    if (patientId && documentId)
        return {
            ":id": `${patientId}_${employeeId}_${documentId}`,
        };
    return {
        ":employeeId": employeeId,
    };
};
exports.default = (employeeId, patientId, documentId) => {
    const query = {
        TableName: constants_1.ENV.ACCUTANE_TASKS_TABLE,
        FilterExpression: generateFilterExpression(employeeId, patientId, documentId),
        ExpressionAttributeValues: generateFilterExpressionAttributeValue(employeeId, patientId, documentId),
    };
    (0, logger_1.logInfo)("DynamoDB query", query);
    return query;
};
//# sourceMappingURL=get-all-miscellaneous.js.map