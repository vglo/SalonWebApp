export interface SalonServiceRequest {
    name: string;
    price: number;
    shopId: string;
    serviceId?: number; // Required for update.
}
