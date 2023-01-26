import {type PrismaClient, type users} from '@prisma/client';

import {BaseModel} from './BaseModel';

type Signup = {
	uuid: string;
	username: string;
	user_role: string;
	client_name: string;
	user_email: string;
	message_cost: number;
};

export class UserModel extends BaseModel {
	constructor(private readonly prismaUser: PrismaClient['users']) {
		super();
	}

	async findOneByPk(userId: number): Promise<users | undefined> {
		return this.prismaUser.findFirst({
			where: {
				id: userId,
			},
		});
	}

	async all(): Promise<users[]> {
		return this.prismaUser.findMany();
	}

	async delete(userId: number) {
		this.prismaUser.delete({
			where: {
				id: userId,
			},
		});
	}

	async signup(data: Signup): Promise<users> {
		return this.prismaUser.create({data});
	}
}
