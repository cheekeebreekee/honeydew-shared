"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentConfig = void 0;
const constants_1 = require("../constants");
exports.paymentConfig = {
    currency: "USD",
    membership: {
        year: {
            amount: 29900,
            priceId: process.env.YEAR_MEMBERSHIP_PRICE_ID,
        },
        month: {
            amount: 3900,
            priceId: process.env.MONTH_MEMBERSHIP_PRICE_ID,
        },
    },
    products: {
        [constants_1.ENV.BENZOYL_PEROXIDE_PRICE_ID]: {
            title: "DewRx BP Wash",
            price: 1500,
        },
        [constants_1.ENV.MOISTURIZER_PRICE_ID]: {
            title: "DewRx Moisturizer",
            price: 1500,
        },
        [constants_1.ENV.PROBIOTICS_PRICE_ID]: {
            title: "DewPro Probiotics",
            price: 2500,
        },
    },
};
//# sourceMappingURL=config.js.map