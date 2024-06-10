export interface Order {
  orderId: number;
  userId: number;
  orderDate: Date;
  totalPrice: number;
  paymentStatus: string;
  shipmentStatus: string;
  deliveryAddressId: number;
  billingAddressId: number;
}
