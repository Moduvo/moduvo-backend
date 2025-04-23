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

import express from 'express'
import { User } from '../models/user'
import { validatekey } from '../middleware/auth'
import { Key } from '../models/key'

const router = express.Router()

router.post('/register', async (req, res) => {
    try {
        console.log('Registration attempt:', req.body)
        const { email, name } = req.body
        
        if (!email || !name) {
            return res.status(400).json({ error: 'email and name are required' })
        }

        const user = new User({ email, name })
        const apikey = await user.generatekey()
        
        res.status(201).json({ 
            status: 'success',
            apikey,
            message: 'Use this API key in x-api-key header'
        })
    } catch (error: any) {
        console.error('Registration failed:', error)
        res.status(400).json({ error: error.message })
    }
})

router.get('/verify', validatekey, (req, res) => {
    res.json({ valid: true })
})

router.post('/redeem', async (req, res) => {
    try {
        const { key } = req.body
        const ip = req.headers['x-forwarded-for'] as string || req.socket.remoteAddress || 'unknown'
        
        if (!key) {
            return res.status(400).json({ error: 'key is required' })
        }

        const isValid = await Key.validate(key, ip)
        if (!isValid) {
            return res.status(401).json({ error: 'invalid or expired key' })
        }

        res.json({ success: true, message: 'key validated' })
    } catch (error) {
        console.error('key validation failed:', error)
        res.status(500).json({ error: 'validation failed' })
    }
})

export default router
