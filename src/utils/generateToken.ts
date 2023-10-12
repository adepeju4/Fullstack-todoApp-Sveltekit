import jwt from 'jsonwebtoken';
import { ServerError } from './ErrorHandler';

interface UserPayload {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

export const generateToken = (user: UserPayload): string => {
    const secret: string = import.meta.env.VITE_DB_SECRET;


    if(!secret) {
        console.error("ERROR: secret key missing or invalid")
        throw new ServerError("Something unexpected happened. Please try again later.");
    }

    return jwt.sign(
        {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        },
        secret,
        {
            expiresIn: '1d'
        }
    );
}
