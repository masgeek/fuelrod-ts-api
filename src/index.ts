import {Prisma, PrismaClient} from '@prisma/client';

import express from 'express';
import {userRoute} from './routes/user';

const prisma = new PrismaClient();

const app = express();

app.use('/api/v1/users', userRoute);

const PORT = process.env.PORT ?? 3000;

const server = app.listen(PORT, () => {
	console.log(`
🚀 Server ready now at: http://localhost:${PORT}
⭐️ See sample requests: https://pris.ly/e/ts/rest-express#3-using-the-rest-api`);
},
);
