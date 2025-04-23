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

import mongoose, { Document } from 'mongoose'
import crypto from 'crypto'

interface IUser extends Document {
    email: string
    name: string
    api_key?: string
    api_key_enabled: boolean
    generatekey(): Promise<string>
}

const userschema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    api_key: { type: String, unique: true, sparse: true },
    api_key_enabled: { type: Boolean, default: false }
})

userschema.methods.generatekey = async function(this: IUser): Promise<string> {
    this.api_key = crypto.randomBytes(32).toString('hex')
    this.api_key_enabled = true
    await this.save()
    return this.api_key
}

export const User = mongoose.model<IUser>('User', userschema)
