"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = void 0;
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("src/constants");
const logger_1 = require("src/utils/logger");
async function nextPage(nextPageUrl) {
    const { data } = await axios_1.default.get(nextPageUrl || "https://api.calendly.com/organization_memberships", {
        params: {
            organization: constants_1.ENV.CALENDLY_ORGANIZATION,
        },
        headers: {
            Authorization: `Bearer ${constants_1.ENV.CALENDLY_API_TOKEN}`,
        },
    });
    return [
        ...data.collection.map(({ user }) => user),
        ...(data.pagination.next_page
            ? await nextPage(data.pagination.next_page)
            : []),
    ];
}
async function getUserByEmail(email) {
    (0, logger_1.logInfo)("Getting Calendly users by email", {
        email,
    });
    const calendlyUsers = await nextPage();
    (0, logger_1.logInfo)("All users found", calendlyUsers);
    const foundUser = calendlyUsers.find((user) => user.email === email);
    if (!foundUser) {
        const message = `Cannot find Calendly user with email "${email}"`;
        (0, logger_1.logError)(message);
        throw new Error(message);
    }
    (0, logger_1.logInfo)("Found user", foundUser);
    return foundUser;
}
exports.getUserByEmail = getUserByEmail;
//# sourceMappingURL=index.js.map