import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAuthenticateCLient {
    username: string;
    password: string;
}

export class AuthenticateClientUseCase {
    async execute({username, password}: IAuthenticateCLient) {

        const client = await prisma.clients.findFirst({
            where: {
                username: username
            }
        })
        if (!client) {
            throw new Error ("Username or Password invalid")
            
        }
        const passwordMatch = await compare(password, client.password);

        if(!passwordMatch) {
            throw new Error ("Username or Password invalid")
        }

        const token = sign({username}, '6bdc121614b67c643c46ab51dabea008', {
            subject: client.id,
            expiresIn: "1d"
        });
        return token;

    }
}