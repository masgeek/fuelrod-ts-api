import {type Request, type Response, Router} from 'express';
import {PrismaClient} from '@prisma/client';
import {UserModel} from '../models/UserModel';

const prisma = new PrismaClient({
	log: [
		{
			emit: 'event',
			level: 'query',
		},
	],
});
// Const router = Router()
//
// router.get('/users', async (req, resp) => {
//     const users = await prisma.users.findMany();
//     console.info("Querying user list endpoint", users);
//
//     resp.status(200).json(users)
// })

prisma.$on('query', e => {
	console.log('Query: ' + e.query);
	console.log('Params: ' + e.params);
	console.log('Duration: ' + e.duration + 'ms');
});

const userModel = new UserModel(prisma.users);

const getUsers = (async (req: Request, res: Response) => {
	const users = await userModel.all();
	const mappedUser = users.map(user => userModel.excludeFields(user, ['password']));
	return res.status(200).json(mappedUser);
});

const getUser = (async (req: Request, res: Response) => {
	const id = parseInt(req.params.userId);

	const user = await userModel.findOneByPk(id);
	if (!user) {
		return res.status(404).json({
			message: 'Product not found',
		});
	}

	const cleanedUser = userModel.excludeFields(user, ['password']);

	return res.json(cleanedUser);
});

export {getUsers, getUser};
