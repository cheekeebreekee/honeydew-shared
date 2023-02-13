"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEventTypesByUser = void 0;
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("src/constants");
const logger_1 = require("src/utils/logger");
async function nextPage(userUri, nextPageUrl) {
    const { data } = await axios_1.default.get(nextPageUrl || "https://api.calendly.com/event_types", {
        params: {
            organization: constants_1.ENV.CALENDLY_ORGANIZATION,
            user: userUri,
            active: true,
        },
        headers: {
            Authorization: `Bearer ${constants_1.ENV.CALENDLY_API_TOKEN}`,
        },
    });
    return [
        ...data.collection,
        ...(data.pagination.next_page
            ? await nextPage(userUri, data.pagination.next_page)
            : []),
    ];
}
async function getEventTypesByUser(userUri) {
    (0, logger_1.logInfo)("Getting Calendly event types related to user", {
        userUri,
    });
    const calendlyEvents = await nextPage(userUri);
    (0, logger_1.logInfo)("Event types found", calendlyEvents);
    return calendlyEvents;
}
exports.getEventTypesByUser = getEventTypesByUser;
//# sourceMappingURL=index.js.map