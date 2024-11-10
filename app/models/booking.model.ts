export interface Booking {
    id: string;
    stationId: string;
    userId: string;
    startTime: Date;
    endTime: Date;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    totalAmount?: number;
    connectorType: string;
}