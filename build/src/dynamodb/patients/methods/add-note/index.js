"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNote = void 0;
const aws_sdk_1 = require("aws-sdk");
const update_notes_1 = __importDefault(require("../../queries/update-notes"));
const get_1 = __importDefault(require("../../queries/get"));
const logger_1 = require("../../../../utils/logger");
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const addNote = async (id, note) => {
    (0, logger_1.logInfo)("Adding note to patient in DB", { id, note });
    const { Item: patient } = await dynamoDb.get((0, get_1.default)(id)).promise();
    (0, logger_1.logInfo)("Patient to add notes to", patient);
    const { notes } = patient;
    const updatedNotes = [...(notes || []), note];
    (0, logger_1.logInfo)("Updated notes data", updatedNotes);
    const { Attributes } = await dynamoDb
        .update((0, update_notes_1.default)(id, updatedNotes))
        .promise();
    (0, logger_1.logInfo)("New note has been added to patient in DB");
    return Attributes;
};
exports.addNote = addNote;
//# sourceMappingURL=index.js.map