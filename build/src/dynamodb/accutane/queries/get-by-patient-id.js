"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../constants");
const logger_1 = require("../../../utils/logger");
exports.default = (patientId) => {
    const query = {
        TableName: constants_1.ENV.ACCUTANE_TABLE,
        KeyConditionExpression: "#patientId = :ID",
        ExpressionAttributeNames: {
            "#patientId": "patientId",
        },
        ExpressionAttributeValues: {
            ":ID": patientId,
        },
        IndexName: "patientIdIndex",
        ReturnValues: "ALL_NEW",
    };
    (0, logger_1.logInfo)("DynamoDB query", query);
    return query;
};
//# sourceMappingURL=get-by-patient-id.js.map