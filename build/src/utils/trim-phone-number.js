"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trimPhoneNumber = void 0;
function trimPhoneNumber(phone) {
    return phone.replace(/[^+0-9]/g, "");
}
exports.trimPhoneNumber = trimPhoneNumber;
//# sourceMappingURL=trim-phone-number.js.map