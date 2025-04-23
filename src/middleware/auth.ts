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

import { Request, Response, NextFunction } from 'express'
import { Key } from '../models/key'

interface AuthRequest extends Request {
    validated?: boolean
    cIP?: string 
}

export const validatekey = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const apikey = req.header('x-api-key')
    if (!apikey) return res.status(401).json({ error: 'no api key provided' })

    const clientIp = req.headers['x-forwarded-for'] as string || req.socket.remoteAddress || 'unknown'
    const isValid = await Key.validate(apikey, clientIp)
    
    if (!isValid) return res.status(401).json({ error: 'invalid or expired key' })

    req.validated = true
    req.cIP = clientIp
    next()
}
