# MODUVO Key Authentication System

IMPORTANT: USAGE REQUIREMENTS
- Must maintain MODUVO attribution in all copies
- Cannot remove watermarks from generated keys
- Commercial use requires written permission
- Failure to comply will result in DMCA takedown

Copyright (c) 2025 MODUVO. All rights reserved.
Licensed under the MIT License.

Simple and secure API key system built with Express and SQLite. Generate, validate, and manage API keys with usage limits and expiration.

Setup:
1. npm install
2. create .env file with ADMIN_SECRET=your_admin_key
3. npm run dev

Generate Keys:
POST /api/generate-key
{
    "adminSecret": "your_admin_key",
    "uses": 5,
    "expiresIn": "24h"
}

Validate Keys:
POST /api/redeem
{
    "key": "your_api_key"
}

Keys expire after set time (default 24h)
Each key has limited uses (default 1)
Keys are encrypted in storage
Base64 + SHA256 for secure key handling

Tech:
- TypeScript
- Express
- SQLite
- Crypto

## License
MIT License - Copyright (c) 2025 MODUVO

## Organization
MODUVO 

For commercial use and support:
Reach out to setnamecallmethod on discord

Made by jeeting
