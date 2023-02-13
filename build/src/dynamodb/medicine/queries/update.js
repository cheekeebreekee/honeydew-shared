"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../constants");
const logger_1 = require("../../../utils/logger");
exports.default = (id, { name, size, strength, instructions, specialInstructions, refillCount, refillExpiration, }) => {
    const query = {
        TableName: constants_1.ENV.MEDICINE_TABLE,
        Key: {
            id,
        },
        UpdateExpression: "set #name=:NAME, #size=:SIZE, #strength=:STRENGTH, #instructions=:INSTRUCTIONS, #specialInstructions=:SPECIAL_INSTRUCTIONS, #refillCount=:REFILL_COUNT, #refillExpiration=:REFILL_EXPIRATION",
        ExpressionAttributeNames: {
            "#name": "name",
            "#size": "size",
            "#strength": "strength",
            "#instructions": "instructions",
            "#specialInstructions": "specialInstructions",
            "#refillCount": "refillCount",
            "#refillExpiration": "refillExpiration",
        },
        ExpressionAttributeValues: {
            ":NAME": name,
            ":SIZE": size,
            ":STRENGTH": strength,
            ":INSTRUCTIONS": instructions,
            ":SPECIAL_INSTRUCTIONS": specialInstructions,
            ":REFILL_COUNT": refillCount,
            ":REFILL_EXPIRATION": refillExpiration,
        },
        ReturnValues: "ALL_NEW",
    };
    (0, logger_1.logInfo)("DynamoDB query", query);
    return query;
};
//# sourceMappingURL=update.js.map