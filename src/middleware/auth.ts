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
import { User } from '../models/user'

interface RequestWithUser extends Request {
    user?: any
}

export const validatekey = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const apikey = req.header('x-api-key')
    if (!apikey) return res.status(401).json({ error: 'no api key provided' })

    const user = await User.findOne({ api_key: apikey, api_key_enabled: true })
    if (!user) return res.status(401).json({ error: 'invalid api key' })

    req.user = user
    next()
}
