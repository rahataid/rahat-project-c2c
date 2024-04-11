import { PrismaService } from '@rumsan/prisma';
import { SettingsService } from '@rumsan/extensions/settings';
import { randomBytes } from 'crypto';
import * as dotenv from 'dotenv';
import { uuidV4 } from 'ethers';
import { writeFileSync } from 'fs';
