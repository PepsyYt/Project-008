import { Observable } from '@nativescript/core';
import { ChargingStation } from '../../models/station.model';
import { ApiService } from '../../services/api.service';
import { StorageService } from '../../services/storage.service';

export class BookingViewModel extends Observable {
    private apiService: ApiService;
    private storageService: StorageService;

    public station: ChargingStation;
    public selectedConnectorIndex: number = 0;
    public startHour: number = new Date().getHours() + 1;
    public startMinute: number = 0;
    public duration: number = 1;

    constructor(station: ChargingStation) {
        super();
        this.station = station;
        this.apiService = new ApiService();
        this.storageService = new StorageService();
    }

    async onBookNow() {
        try {
            const userId = 'current-user'; // Replace with actual user authentication
            const startTime = new Date();
            startTime.setHours(this.startHour, this.startMinute);
            
            const endTime = new Date(startTime);
            endTime.setHours(startTime.getHours() + this.duration);

            const booking = await this.apiService.createBooking({
                stationId: this.station.id,
                userId: userId,
                startTime: startTime,
                endTime: endTime,
                connectorType: this.station.connectorTypes[this.selectedConnectorIndex],
                totalAmount: this.station.pricePerKwh * this.duration
            });

            if (booking) {
                // Deduct amount from wallet
                this.storageService.updateWalletBalance(userId, -booking.totalAmount);
                // Navigate back or show confirmation
            }
        } catch (error) {
            console.error('Booking failed:', error);
        }
    }
}