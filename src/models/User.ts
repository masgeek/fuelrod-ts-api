import {PrismaClient, users} from '@prisma/client'

import {BaseModel} from "./BaseModel";


type Signup = {
    uuid: string
    username: string
    user_role: string
    client_name: string
    user_email: string
    message_cost: number
}

export class User extends BaseModel {
    constructor(private readonly prismaUser: PrismaClient['users']) {
        super();
    }

    async loadAll(): Promise<Array<users>> {
        return this.prismaUser.findMany();
    }

    async signup(data: Signup): Promise<users> {
        return this.prismaUser.create({data})
    }
}