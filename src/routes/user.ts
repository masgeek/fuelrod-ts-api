import {Router} from 'express';
import {getUsers, getUser} from '../controllers/UserController';

const userRoute = Router();

userRoute.get('/', getUsers);
userRoute.get('/:userId', getUser);

export {userRoute};
