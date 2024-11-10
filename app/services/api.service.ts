import axios from 'axios';
import { ChargingStation } from '../models/station.model';
import { Booking } from '../models/booking.model';

export class ApiService {
    private baseUrl = 'https://api.evcharging.example'; // Replace with actual API URL

    async getStations(lat: number, lng: number, radius: number = 5): Promise<ChargingStation[]> {
        // Simulated API response for demo
        return [
            {
                id: '1',
                name: 'Central Station',
                latitude: lat + 0.01,
                longitude: lng + 0.01,
                address: '123 Main St',
                availableSlots: 5,
                pricePerKwh: 0.15,
                connectorTypes: ['Type 2', 'CCS'],
                rating: 4.5
            },
            {
                id: '2',
                name: 'North Station',
                latitude: lat - 0.01,
                longitude: lng - 0.01,
                address: '456 North Ave',
                availableSlots: 3,
                pricePerKwh: 0.18,
                connectorTypes: ['Type 2', 'CHAdeMO'],
                rating: 4.2
            }
        ];
    }

    async createBooking(booking: Partial<Booking>): Promise<Booking> {
        // Simulated booking creation
        return {
            id: Math.random().toString(36).substr(2, 9),
            ...booking,
            status: 'confirmed',
        } as Booking;
    }
}