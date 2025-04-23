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
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth'
import path from 'path'
import { Key } from './models/key'

dotenv.config()

const ADMIN_SECRET = process.env.ADMIN_SECRET
if (!ADMIN_SECRET) {
    console.error('Missing admin secret')
    process.exit(1)
}

const app = express()
app.use(cors())
app.use(express.json())

Key.init()

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`, req.body)
    next()
})

app.use(express.static('public'))
app.use('/api', authRoutes)

app.post('/api/generate-key', async (req, res) => {
    try {
        const { adminSecret, uses = 1, expiresIn = '24h' } = req.body
        
        if (!adminSecret) {
            return res.status(400).json({ 
                success: false, 
                error: 'Admin secret is required' 
            })
        }
        
        if (adminSecret !== ADMIN_SECRET) {
            return res.status(401).json({ 
                success: false, 
                error: 'Invalid admin secret' 
            })
        }

        const keyData = await Key.generate(parseInt(uses), expiresIn)
        console.log('Key generated successfully:', { uses, expiresIn })
        
        res.json({ 
            success: true, 
            key: keyData.key,
            expires: keyData.expires,
            message: 'Save this key! It will not be shown again.'
        })
    } catch (error: any) {
        console.error('Key generation error:', error)
        res.status(500).json({ 
            success: false, 
            error: error?.message || 'Unknown error'
        })
    }
})

app.get('/api', (req, res) => {
    res.json({
        status: 'API is running',
        endpoints: {
            register: 'POST /api/register',
            verify: 'GET /api/verify'
        }
    })
})

app.get('/', (req, res) => {
    res.json({ 
        status: 'online',
        docs: 'GET /api for API documentation'
    })
})

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack)
    res.status(500).json({ error: 'Something broke!' })
})

app.listen(3000, () => console.log('server running on port 3000'))
