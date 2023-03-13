export interface PaymentCreationPayload {
  customerId: string;
  paymentMethodId: string;
  subscriptionItems: {
    price: string;
  }[];
  metadata: {
    userId: string;
  };
  promotionCode: string;
  productItems: {
    quantity: number;
    price: string;
  }[];
}

export type UpdateInternalCreditEvent = {
  customerId: string;
  amount: number;
  description: string;
};
