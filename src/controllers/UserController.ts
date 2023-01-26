import {Router} from "express";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
const router = Router()

router.get('/users', async (req, resp) => {
    const users = await prisma.users.findMany();
    console.info("Querying user list endpoint", users);

    resp.status(200).json(users)
})

export default router

export class UserController {

}