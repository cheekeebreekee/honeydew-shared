"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByPatientId = void 0;
const aws_sdk_1 = require("aws-sdk");
const logger_1 = require("../../../../utils/logger");
const get_by_patient_id_1 = __importDefault(require("../../queries/get-by-patient-id"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const getByPatientId = async (id) => {
    (0, logger_1.logInfo)("Getting Accutane notification from DB by patient ID", { id });
    const { Items } = await dynamoDb.scan((0, get_by_patient_id_1.default)(id)).promise();
    if (!Items) {
        const message = `Accutane notification with patient ID ${id} is not found`;
        (0, logger_1.logError)(message);
        return null;
    }
    (0, logger_1.logInfo)(`Accutane notification found`, Items);
    return Items[0];
};
exports.getByPatientId = getByPatientId;
//# sourceMappingURL=index.js.map