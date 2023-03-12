export enum FB_EVENT_TYPES {
    SCHEDULE = "Schedule",
    PURCHASE = "Purchase",
    COMPLETE_REGISTRATION = "CompleteRegistration",
    PAGE_VIEW = "PageView",
    INITIATE_CHECKOUT = "InitiateCheckout"
}

export type FacebookAnalyticsScheduleEventPayload = {
    email: string;
};
export type FacebookAnalyticsPurchaseEventPayload = {
    email: string;
    amount: number;
};
export type FacebookAnalyticsCompleteRegistrationEventPayload = {
    email: string;
};
export type FacebookAnalyticsPageViewEventPayload = {
    fbp: string;
};
export type FacebookAnalyticsInitiateCheckoutEventPayload = {
    fbp: string;
};

export type FacebookAnalyticsEventPayload = FacebookAnalyticsScheduleEventPayload
    | FacebookAnalyticsPurchaseEventPayload
    | FacebookAnalyticsCompleteRegistrationEventPayload
    | FacebookAnalyticsPageViewEventPayload
    | FacebookAnalyticsInitiateCheckoutEventPayload

export interface FacebookAnalyticsConfig {
    pixelId: string;
    accessToken: string;
    baseUrl: string;
    testEventCode: string;
}

export interface AnalyticsConfig {
    facebook: FacebookAnalyticsConfig;
}