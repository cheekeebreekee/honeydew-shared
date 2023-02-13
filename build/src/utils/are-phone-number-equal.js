"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arePhoneNumbersEqual = void 0;
const unify_phone_number_1 = require("./unify-phone-number");
const arePhoneNumbersEqual = (phone1, phone2) => (0, unify_phone_number_1.unifyPhoneNumber)(phone1) === (0, unify_phone_number_1.unifyPhoneNumber)(phone2);
exports.arePhoneNumbersEqual = arePhoneNumbersEqual;
//# sourceMappingURL=are-phone-number-equal.js.map