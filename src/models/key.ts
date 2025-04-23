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

import crypto from 'crypto'
import { getdb} from '../utils/db'
import { encrypt, decrypt } from '../utils/crypto'

interface KeyData {
    key: string
    uses: number
    expires: Date
    used: number
    hash: string
}

export class Key {
    static async init() {
        await getdb()
    }

    static async generate(uses = 1, expiresIn = '24h') {
        const db = await getdb()
        const rawKey = `MODUVO-${crypto.randomBytes(16).toString('hex')}`
        const expires = new Date(Date.now() + this.parseTime(expiresIn))
        const hash = crypto.createHash('sha256').update(rawKey).digest('hex')
        
        await db.run(
            'INSERT INTO keys (key, hash, uses, expires) VALUES (?, ?, ?, ?)',
            rawKey, hash, uses, expires.toISOString()
        )
        
        return { key: rawKey, expires }
    }

    static async validate(key: string) {
        const db = await getdb()
        const hash = crypto.createHash('sha256').update(key).digest('hex')
        
        const keyData = await db.get(
            'SELECT * FROM keys WHERE hash = ? AND used < uses AND expires > ?',
            hash, new Date().toISOString()
        )
        
        if (!keyData) return false

        await db.run('UPDATE keys SET used = used + 1 WHERE hash = ?', hash)
        return true
    }

    private static parseTime(time: string): number {
        const unit = time.slice(-1)
        const value = parseInt(time.slice(0, -1))
        
        switch(unit) {
            case 'h': return value * 60 * 60 * 1000
            case 'd': return value * 24 * 60 * 60 * 1000
            default: return 24 * 60 * 60 * 1000
        }
    }
}
