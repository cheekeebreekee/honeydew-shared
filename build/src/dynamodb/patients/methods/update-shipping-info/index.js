"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateShippingInfo = void 0;
const aws_sdk_1 = require("aws-sdk");
const logger_1 = require("../../../../utils/logger");
const update_shipping_info_1 = __importDefault(require("../../queries/update-shipping-info"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const updateShippingInfo = async (id, shippingInfoPayload) => {
    (0, logger_1.logInfo)("Updating patient's shipping info in DB", {
        id,
        shippingInfoPayload,
    });
    const { Attributes } = await dynamoDb
        .update((0, update_shipping_info_1.default)(id, shippingInfoPayload))
        .promise();
    (0, logger_1.logInfo)("Patient has been updated successfully");
    return Attributes;
};
exports.updateShippingInfo = updateShippingInfo;
//# sourceMappingURL=index.js.map