"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferralFactoryService = void 0;
const get_user_by_referral_id_1 = require("./methods/get-user-by-referral-id");
const get_user_by_code_1 = require("./methods/get-user-by-code");
const create_user_1 = require("./methods/create-user");
const qualify_user_by_referral_id_1 = require("./methods/qualify-user-by-referral-id");
exports.ReferralFactoryService = {
    qualifyUserByReferralId: qualify_user_by_referral_id_1.qualifyUserByReferralId,
    getUserByReferralId: get_user_by_referral_id_1.getUserByReferralId,
    getUserByCode: get_user_by_code_1.getUserByCode,
    createUser: create_user_1.createUser,
};
//# sourceMappingURL=index.js.map