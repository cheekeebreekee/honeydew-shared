"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("src/constants");
const logger_1 = require("src/utils/logger");
async function createUser(full_name, email) {
    (0, logger_1.logInfo)("Create user in Referral Factory with payload", {
        first_name: full_name,
        email,
        campaign_id: constants_1.ENV.REFERRAL_FACTORY_COMPANY_ID,
    });
    const [first_name, ...last_name] = full_name.split(" ");
    try {
        const response = await axios_1.default.post(`${constants_1.ENV.REFERRAL_FACTORY_BASE_URL}/users`, {
            first_name,
            last_name: last_name.length ? last_name.join(" ") : first_name,
            email,
            campaign_id: constants_1.ENV.REFERRAL_FACTORY_COMPANY_ID,
        }, { headers: { Authorization: `Bearer ${constants_1.ENV.REFERRAL_FACTORY_API_KEY}` } });
        (0, logger_1.logInfo)("User created", response.data);
        return response.data.data;
    }
    catch (e) {
        (0, logger_1.logError)("Error durng creation of user in Referral Factory", e.response.data);
        throw e.response.data;
    }
}
exports.createUser = createUser;
//# sourceMappingURL=create-user.js.map