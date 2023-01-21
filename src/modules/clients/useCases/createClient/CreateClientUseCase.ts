import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";

interface ICreateCLient {
    username: string;
    password: string;
}

export class CreateClientUseCase {

    async execute({username, password}: ICreateCLient) {

        const clientExist = await prisma.clients.findFirst({
            where: {
                username: username
            }
        })
        if (clientExist) {
            throw new Error ("Client already exists")
        }

        const hashPassword = await hash(password,10);
        const client = await prisma.clients.create({
            data: {
                username,
                password: hashPassword
            }
        })
        return client

    }
}