"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleUseEventLink = void 0;
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("src/constants");
const logger_1 = require("src/utils/logger");
async function getSingleUseEventLink(eventUri) {
    (0, logger_1.logInfo)("Getting Calendly single use link", {
        eventUri,
    });
    const { data } = await axios_1.default.post("https://api.calendly.com/scheduling_links", {
        max_event_count: 1,
        owner: eventUri,
        owner_type: "EventType",
    }, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${constants_1.ENV.CALENDLY_API_TOKEN}`,
        },
    });
    (0, logger_1.logInfo)("Calendly single use link obtained", data);
    return data;
}
exports.getSingleUseEventLink = getSingleUseEventLink;
//# sourceMappingURL=index.js.map