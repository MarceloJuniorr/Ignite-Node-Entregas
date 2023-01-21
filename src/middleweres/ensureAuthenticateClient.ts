import { NextFunction, request, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}



export async function ensureAuthenticateCLient(
    req: Request, 
    res: Response, 
    next: NextFunction 
) {
    

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Please enter the token in the 'authorization' tag in the 'header'"
        })
        
    }

    const [,token ] = authHeader.split(" ")
    

    try {
        
        const { sub } = verify(token, "6bdc121614b67c643c46ab51dabea008" ) as IPayload

        console.log(sub);

        request.id_client = sub;

        return next();
        
    } catch (err) {

        return res.status(401).json({
            message: "Invalid token!"
        })   
    }


    
}