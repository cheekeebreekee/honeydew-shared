"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../constants");
const logger_1 = require("../../../utils/logger");
exports.default = (id, { photos, createdAt, eSignature, completed }) => {
    const query = {
        TableName: constants_1.ENV.ACCUTANE_TABLE,
        Key: {
            id,
        },
        UpdateExpression: "set #pregnancyTest.#photos=:PHOTOS, #pregnancyTest.#createdAt=:CREATED_AT,  #pregnancyTest.#completed=:COMPLETED, #pregnancyTest.#eSignature=:E_SIGNATURE",
        ExpressionAttributeNames: {
            "#pregnancyTest": "pregnancyTest",
            "#photos": "photos",
            "#createdAt": "createdAt",
            "#eSignature": "eSignature",
            "#completed": "completed",
        },
        ExpressionAttributeValues: {
            ":PHOTOS": photos,
            ":CREATED_AT": createdAt,
            ":E_SIGNATURE": eSignature,
            ":COMPLETED": completed,
        },
        ReturnValues: "ALL_NEW",
    };
    (0, logger_1.logInfo)("DynamoDB query", query);
    return query;
};
//# sourceMappingURL=add-pregnancy-test.js.map