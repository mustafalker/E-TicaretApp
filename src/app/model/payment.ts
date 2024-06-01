export interface Payment {
          paymentId: number;
          orderId: number;
          paymentType: string;
          amount: number;
          paymentStatus: string;
          paymentDate: Date;
        }
        