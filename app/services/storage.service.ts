import { ApplicationSettings } from '@nativescript/core';

export class StorageService {
    private prefix = 'ev_charging_';

    setItem(key: string, value: any): void {
        ApplicationSettings.setString(this.prefix + key, JSON.stringify(value));
    }

    getItem<T>(key: string, defaultValue: T = null): T {
        const value = ApplicationSettings.getString(this.prefix + key);
        return value ? JSON.parse(value) : defaultValue;
    }

    removeItem(key: string): void {
        ApplicationSettings.remove(this.prefix + key);
    }

    getWalletBalance(userId: string): number {
        return this.getItem<number>(`wallet_${userId}`, 0);
    }

    updateWalletBalance(userId: string, amount: number): void {
        const currentBalance = this.getWalletBalance(userId);
        this.setItem(`wallet_${userId}`, currentBalance + amount);
    }
}