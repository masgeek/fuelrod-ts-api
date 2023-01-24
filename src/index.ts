import {Prisma, PrismaClient} from '@prisma/client';

import express from "express";

const prisma = new PrismaClient();

const app = express();

// app.use(express.json);

app.get(`/users`, async (req, res) => {
    const users = await prisma.users.findMany();
    console.info("Querying endpoint", users);

    // const data = JSON.stringify(
    //     users,
    //     (key, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
    // );
    // res.json(JSON.parse(data));
    res.json(users);
});

const PORT = process.env.PORT || 3000

const server = app.listen(PORT, () =>
    console.log(`
🚀 Server ready at: http://localhost:${PORT}
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)