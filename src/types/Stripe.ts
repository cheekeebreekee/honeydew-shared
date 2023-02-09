export interface StripeDiscountCoupon {
  id: string;
  object: string;
  amount_off: number | null;
  created: number;
  currency: string | null;
  duration: string;
  duration_in_months: number | null;
  livemode: boolean;
  name: string;
  percent_off: number | null;
  times_redeemed: number;
  valid: boolean;
}

export interface StripeDiscount {
  id: string;
  object: string;
  coupon: StripeDiscountCoupon;
  customer: string;
  promotion_code: string;
  start: number;
  subscription: string;
}

export interface StripePrice {
  id: string;
  object: string;
  active: boolean;
  billing_scheme: string;
  created: number;
  currency: string;
  livemode: boolean;
  product: string;
  unit_amount: number;
  unit_amount_decimal: string;
}

export interface StripePlan {
  active: boolean;
  amount: number;
  amount_decimal: string;
  billing_scheme: string;
  created: number;
  currency: string;
  interval: string;
  interval_count: number;
  livemode: boolean;
  product: string;
}

export interface StripeItem {
  id: string;
  object: string;
  plan: StripePlan;
  price: StripePrice;
  quantity: number;
  subscription: string;
}

export interface StripePaymentData {
  id: string;
  object: string;
  application_fee_percent: number | null;
  automatic_tax: {
    enabled: boolean;
  };
  metadata: {
    userId: string;
    existAlready?: string;
  };
  items: {
    object: string;
    data: StripeItem[];
  };
  customer: string;
  discount: StripeDiscount | null;
  status: string;
}

export interface StripeSubscriptionCreatedPayload {
  id: string;
  object: string;
  api_version: string;
  created: number;
  data: {
    object: StripePaymentData;
  };
  type: string;
}
