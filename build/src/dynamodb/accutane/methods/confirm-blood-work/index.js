"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmBloodWork = void 0;
const aws_sdk_1 = require("aws-sdk");
const index_1 = require("../../../index");
const logger_1 = require("../../../../utils/logger");
const confirm_blood_work_1 = __importDefault(require("../../queries/confirm-blood-work"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const confirmBloodWork = async (patientId, confirmed) => {
    (0, logger_1.logInfo)("Confirming blood work of Accutane record", patientId);
    const accutane = await index_1.DynamoDBService.accutane.getByPatientId(patientId);
    if (!(accutane === null || accutane === void 0 ? void 0 : accutane.id)) {
        const message = "Accutane record not found in database";
        (0, logger_1.logError)(message);
        throw new Error(message);
    }
    (0, logger_1.logInfo)("Confirming blood work in Accutane record", accutane);
    const { Attributes } = await dynamoDb
        .update((0, confirm_blood_work_1.default)(accutane === null || accutane === void 0 ? void 0 : accutane.id, confirmed))
        .promise();
    (0, logger_1.logInfo)("blood work was successfully added to accutane record", Attributes);
    return Attributes;
};
exports.confirmBloodWork = confirmBloodWork;
//# sourceMappingURL=index.js.map