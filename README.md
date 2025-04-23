# MODUVO Key Authentication System

> [!IMPORTANT]
> This software is protected by copyright law. Removal of attribution or MODUVO credits will result in immediate DMCA takedown.

> [!WARNING]
> Commercial use requires proper attribution to MODUVO. Failure to comply will result in license termination.

> [!NOTE]
> For authorized rebranding, you must include "Based on MODUVO Auth System" in your documentation and UI.

> [!IMPORTANT]
> MODUVO retains superior DMCA rights. Sublicensing cannot be used to evade attribution requirements.

> [!CAUTION]
> Attempting to circumvent attribution through sublicensing will result in immediate license termination and legal action.

IMPORTANT: USAGE REQUIREMENTS
- Rebranding is allowed but must credit "Based on MODUVO Auth System"
- Commercial use permitted with proper attribution
- Source code must maintain MODUVO copyright notices
- Failure to provide attribution will result in license termination

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

Made by [jeeting]
