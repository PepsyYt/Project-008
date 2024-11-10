import { Sqlite } from '@nativescript/sqlite';

export class DatabaseService {
    private db: Sqlite;

    async init() {
        this.db = await new Sqlite('evcharging.db');
        await this.createTables();
    }

    private async createTables() {
        await this.db.execSQL(`
            CREATE TABLE IF NOT EXISTS wallet (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                balance REAL NOT NULL,
                userId TEXT NOT NULL
            )
        `);

        await this.db.execSQL(`
            CREATE TABLE IF NOT EXISTS bookings (
                id TEXT PRIMARY KEY,
                stationId TEXT NOT NULL,
                userId TEXT NOT NULL,
                startTime TEXT NOT NULL,
                endTime TEXT NOT NULL,
                status TEXT NOT NULL,
                totalAmount REAL NOT NULL
            )
        `);
    }

    async getWalletBalance(userId: string): Promise<number> {
        const result = await this.db.get(
            'SELECT balance FROM wallet WHERE userId = ?',
            [userId]
        );
        return result ? result[0].balance : 0;
    }

    async updateWalletBalance(userId: string, amount: number): Promise<void> {
        await this.db.execSQL(
            'UPDATE wallet SET balance = balance + ? WHERE userId = ?',
            [amount, userId]
        );
    }
}