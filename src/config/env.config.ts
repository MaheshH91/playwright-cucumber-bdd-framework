import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const ENV = {
    BASE_URL: process.env.URL || 'https://tutorialsninja.com/demo/',
    HEADLESS: process.env.HEADLESS === 'true',
    EXPLICIT_WAIT: Number(process.env.EXPLICIT_WAIT || 10),
    PAGE_LOAD_TIMEOUT: Number(process.env.PAGE_LOAD_TIMEOUT || 15),
    MAX_RETRY_COUNT: Number(process.env.MAX_RETRY_COUNT || 1),
    VALID_EMAIL: process.env.VALID_EMAIL || 'mahesh.jadhav@aressindia.net',
    VALID_PASSWORD: process.env.VALID_PASSWORD || '123456789',
    FIRST_NAME: process.env.FIRST_NAME || 'Mahesh',
    LAST_NAME: process.env.LAST_NAME || 'Holkar',
    TELEPHONE: process.env.TELEPHONE || '9878943234'
};
