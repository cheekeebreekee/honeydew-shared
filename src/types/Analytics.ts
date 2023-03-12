export enum EVENT_TYPES {
    SCHEDULE = "Schedule",
    PURCHASE = "Purchase",
    COMPLETE_REGISTRATION = "CompleteRegistration",
    PAGE_VIEW = "PageView",
    INITIATE_CHECKOUT = "InitiateCheckout"
}

export interface FacebookAnalyticsConfig {
    pixelId: string;
    accessToken: string;
    baseUrl: string;
    testEventCode: string;
}

export interface AnalyticsConfig {
    facebook: FacebookAnalyticsConfig;
}