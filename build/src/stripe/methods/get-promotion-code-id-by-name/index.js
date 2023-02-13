"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPromotionCodeIdByName = void 0;
const __1 = require("../..");
const logger_1 = require("../../../utils/logger");
async function getPromotionCodeIdByName(name) {
    var _a;
    (0, logger_1.logInfo)("Getting promotion code by name", { name });
    const { data } = await __1.StripeClient.promotionCodes.list({
        code: name,
        limit: 1,
        expand: ["data.coupon.applies_to"],
    });
    if (!data.length) {
        throw new Error("Invalid promotion code");
    }
    const promotionCode = data[0];
    (0, logger_1.logInfo)("Promotion code found", promotionCode);
    if ((_a = promotionCode.coupon.applies_to) === null || _a === void 0 ? void 0 : _a.products) {
        const relatedProductIDs = promotionCode.coupon.applies_to.products;
        const allPriceIDs = await __1.StripeClient.prices.list();
        const relatedPriceIDs = relatedProductIDs
            .map((productId) => {
            const priceIds = allPriceIDs.data.filter((price) => price.product === productId);
            if (!priceIds.length)
                throw new Error(`Such product ID does not exist in Stripe: ${productId}`);
            return priceIds.map(({ id }) => id);
        })
            .flat();
        const uniquePriceIDs = Array.from(new Set(relatedPriceIDs));
        (0, logger_1.logInfo)("Price IDs mapped", uniquePriceIDs);
        promotionCode.coupon.applies_to.products = uniquePriceIDs;
    }
    return promotionCode;
}
exports.getPromotionCodeIdByName = getPromotionCodeIdByName;
//# sourceMappingURL=index.js.map