/**
 * MODUVO Key Authentication System
 * Copyright (c) 2025 MODUVO. All rights reserved.
 * 
 * This source code is licensed under the MIT license with additional conditions:
 * - Attribution to MODUVO is required in all copies or substantial portions
 * - Generated keys must maintain MODUVO watermark
 * - Removal of copyright or watermarks is prohibited
 * - Any commercial use requires explicit written permission
 */

import sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite'
import path from 'path'

const dbFile = path.join(__dirname, '../../data/keys.db')

let db: Database | null = null

export async function initdb() {
    if (!db) {
        db = await open({
            filename: dbFile,
            driver: sqlite3.Database
        })
        
        await db.exec(`
            CREATE TABLE IF NOT EXISTS keys (
                key TEXT PRIMARY KEY,
                hash TEXT UNIQUE,
                uses INTEGER DEFAULT 1,
                used INTEGER DEFAULT 0,
                expires TEXT,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP
            )
        `)
    }
    return db
}

export async function getdb() {
    if (!db) await initdb()
    return db!
}
