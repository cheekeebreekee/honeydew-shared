"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = void 0;
const aws_sdk_1 = require("aws-sdk");
const index_1 = require("../../../index");
const logger_1 = require("../../../../utils/logger");
const update_1 = __importDefault(require("../../queries/update"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const update = async (enrollmentCoordinatorPartial) => {
    (0, logger_1.logInfo)("Updating enrollment coordinator", enrollmentCoordinatorPartial);
    if (!enrollmentCoordinatorPartial.id) {
        const message = "Enrollment Coordinator ID is not found in partial";
        (0, logger_1.logError)(message);
        throw new Error(message);
    }
    const enrollmentCoordinator = await index_1.DynamoDBService.enrollmentCoordinators.get(enrollmentCoordinatorPartial.id);
    (0, logger_1.logInfo)("Enrollment coordinator to update", enrollmentCoordinator);
    const updatedEnrollmentCoordinator = {
        ...enrollmentCoordinator,
        ...enrollmentCoordinatorPartial,
    };
    (0, logger_1.logInfo)("Data to upate", updatedEnrollmentCoordinator);
    const { Attributes } = await dynamoDb
        .update((0, update_1.default)(updatedEnrollmentCoordinator))
        .promise();
    (0, logger_1.logInfo)("Enrollment coordinator has been updated successfully");
    return Attributes;
};
exports.update = update;
//# sourceMappingURL=index.js.map