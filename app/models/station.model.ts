export interface ChargingStation {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    address: string;
    availableSlots: number;
    pricePerKwh: number;
    connectorTypes: string[];
    rating: number;
}