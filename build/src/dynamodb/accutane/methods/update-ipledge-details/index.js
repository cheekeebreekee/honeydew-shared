"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateIPledgeDetails = void 0;
const aws_sdk_1 = require("aws-sdk");
const index_1 = require("../../../index");
const logger_1 = require("../../../../utils/logger");
const update_ipledge_details_1 = __importDefault(require("../../queries/update-ipledge-details"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const updateIPledgeDetails = async (patient, { lastConfirmationDate, nextConfirmationDate, enrollmentDate, remsNumber, }) => {
    (0, logger_1.logInfo)("Updating IPledge details of Accutane record", patient.id);
    const accutane = await index_1.DynamoDBService.accutane.getByPatientId(patient.id);
    if (!(accutane === null || accutane === void 0 ? void 0 : accutane.id)) {
        const message = "Accutane record not found in database";
        (0, logger_1.logError)(message);
        throw new Error(message);
    }
    (0, logger_1.logInfo)("Updating IPledge details in Accutane record", accutane);
    const query = (0, update_ipledge_details_1.default)(accutane.id, {
        lastConfirmationDate,
        nextConfirmationDate,
        enrollmentDate,
        remsNumber,
    });
    const { Attributes } = await dynamoDb.update(query).promise();
    (0, logger_1.logInfo)("IPledge details was successfully updated", Attributes);
    return Attributes;
};
exports.updateIPledgeDetails = updateIPledgeDetails;
//# sourceMappingURL=index.js.map