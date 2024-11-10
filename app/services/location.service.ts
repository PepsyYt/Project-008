import { Geolocation, getCurrentLocation, enableLocationRequest } from '@nativescript/geolocation';

export class LocationService {
    async getCurrentLocation() {
        try {
            const hasPermission = await enableLocationRequest();
            if (!hasPermission) {
                throw new Error('Location permission denied');
            }
            
            const location = await getCurrentLocation({
                desiredAccuracy: 3,
                maximumAge: 5000,
                timeout: 10000
            });
            
            return {
                latitude: location.latitude,
                longitude: location.longitude
            };
        } catch (error) {
            console.error('Error getting location:', error);
            throw error;
        }
    }
}