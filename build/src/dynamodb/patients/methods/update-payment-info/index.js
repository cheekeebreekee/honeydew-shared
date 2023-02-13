"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePaymentInfo = void 0;
const aws_sdk_1 = require("aws-sdk");
const update_payment_info_1 = __importDefault(require("../../queries/update-payment-info"));
const logger_1 = require("../../../../utils/logger");
const index_1 = require("../../../index");
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const updatePaymentInfo = async (id, membership, paymentInfo) => {
    (0, logger_1.logInfo)("Updating patient's payment info in DB", {
        id,
        membership,
        paymentInfo,
    });
    const patient = await index_1.DynamoDBService.patients.get(id);
    (0, logger_1.logInfo)("Patient to update", patient);
    const updatedMembership = {
        ...patient.membership,
        ...(membership || {}),
    };
    const updatedPaymentInfo = {
        ...patient.paymentInfo,
        ...(paymentInfo || {}),
    };
    (0, logger_1.logInfo)("Updated membership and payment info data", {
        updatedMembership,
        updatedPaymentInfo,
    });
    const { Attributes } = await dynamoDb
        .update((0, update_payment_info_1.default)(id, updatedMembership, updatedPaymentInfo))
        .promise();
    (0, logger_1.logInfo)("Patient has been updated successfully");
    return Attributes;
};
exports.updatePaymentInfo = updatePaymentInfo;
//# sourceMappingURL=index.js.map