"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelAppointment = void 0;
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("src/constants");
const logger_1 = require("src/utils/logger");
async function cancelAppointment(uuid) {
    (0, logger_1.logInfo)("Cancelling Calendly event", {
        uuid,
    });
    try {
        const { data } = await axios_1.default.post(`https://api.calendly.com/scheduled_events/${uuid}/cancellation`, {
            reason: "[Honeydew Bot] Another initial appointment scheduled",
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${constants_1.ENV.CALENDLY_API_TOKEN}`,
            },
        });
        (0, logger_1.logInfo)("Calendly appointment cancellation response", data);
        return data;
    }
    catch (e) {
        if (e.response.status === 403) {
            (0, logger_1.logInfo)("Unable to cancel an appointment for some reason", e.response.data);
            return null;
        }
        (0, logger_1.logInfo)("Error occured", e);
        throw new Error("Error while cancelling an appointment");
    }
}
exports.cancelAppointment = cancelAppointment;
//# sourceMappingURL=index.js.map