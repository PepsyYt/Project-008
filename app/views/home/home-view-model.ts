import { Observable } from '@nativescript/core';
import { Geolocation } from '@nativescript/geolocation';

export class HomeViewModel extends Observable {
    private _userLatitude: number = 0;
    private _userLongitude: number = 0;
    private _walletBalance: string = "$0.00";
    private _transactions: Array<any> = [];
    private _bookings: Array<any> = [];

    constructor() {
        super();
        this.initializeData();
        this.getCurrentLocation();
    }

    get userLatitude(): number {
        return this._userLatitude;
    }

    get userLongitude(): number {
        return this._userLongitude;
    }

    get walletBalance(): string {
        return this._walletBalance;
    }

    get transactions(): Array<any> {
        return this._transactions;
    }

    get bookings(): Array<any> {
        return this._bookings;
    }

    async getCurrentLocation() {
        try {
            const location = await Geolocation.getCurrentLocation({
                desiredAccuracy: 3,
                maximumAge: 5000,
                timeout: 10000
            });
            
            this._userLatitude = location.latitude;
            this._userLongitude = location.longitude;
            this.notifyPropertyChange('userLatitude', location.latitude);
            this.notifyPropertyChange('userLongitude', location.longitude);
        } catch (error) {
            console.error('Error getting location:', error);
        }
    }

    findNearestStation() {
        // Implementation for finding nearest charging station
        console.log('Finding nearest station...');
    }

    addMoney() {
        // Implementation for adding money to wallet
        console.log('Adding money to wallet...');
    }

    bookNewSlot() {
        // Implementation for booking new charging slot
        console.log('Booking new slot...');
    }

    private initializeData() {
        this._walletBalance = "$150.00";
        
        this._transactions = [
            { description: "Charging at Station A", amount: "-$25.00" },
            { description: "Added Money", amount: "+$100.00" },
            { description: "Charging at Station B", amount: "-$30.00" }
        ];

        this._bookings = [
            { 
                stationName: "EV Station Downtown",
                status: "Upcoming",
                dateTime: "Tomorrow, 2:00 PM"
            },
            {
                stationName: "Quick Charge Station",
                status: "Completed",
                dateTime: "Yesterday, 3:30 PM"
            }
        ];
    }
}