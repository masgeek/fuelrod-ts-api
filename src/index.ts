import {Prisma, PrismaClient,} from '@prisma/client';

import express from "express";
import {randomUUID} from "crypto";
import {User} from "./models/User";

const prisma = new PrismaClient();

const app = express();


app.get(`/users`, async (req, res) => {

    const userModel = new User(prisma.users)

    const users = await userModel.loadAll();
    const k = users.map(user => userModel.excludeFields(user, ['password']));


    // const newUser = await userModel.signup({
    //     uuid: randomUUID().toString(),
    //     client_name: 'test this name',
    //     message_cost: 900.78,
    //     user_email: 'testemail',
    //     user_role: 'USER',
    //     username: 'masgeek'
    // });

    // console.error('user save', newUser);
    res.json(k);
});

const PORT = process.env.PORT || 3000

const server = app.listen(PORT, () =>
    console.log(`
🚀 Server ready at: http://localhost:${PORT}
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)