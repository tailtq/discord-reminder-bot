import fs from 'fs';

fs.rmSync('./node_modules/.prisma', { recursive: true, force: true });
