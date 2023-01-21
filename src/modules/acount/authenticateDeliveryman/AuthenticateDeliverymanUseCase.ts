import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAuthenticateDeliveryman {
    username: string;
    password: string;
}

export class AuthenticateDeliverymanUseCase {
    async execute({username, password}: IAuthenticateDeliveryman) {
        const deliveryman = await prisma.deliveryman.findFirst({
            where: {
                username
            }
        })
        if (!deliveryman) {
            throw new Error("Username or Password invalid");
        }

        const passwordMatch = await compare(password, deliveryman.password);

        if (!passwordMatch) {
            throw new Error("Username or Password invalid");
        }

        const token = sign({username}, '6bdc121614b67c643c46ab51dabea008', {
            subject: deliveryman.id,
            expiresIn: "1d"
        })
        
        return token
    }
}