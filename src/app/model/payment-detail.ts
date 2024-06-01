export interface PaymentDetail {
          paymentId: number;
          userId: number;
          cardType: string;
          cardNumber: string;
          expirationDate: Date;
          cvv: string;
          billingAddressId: number;
        }
        