import express, { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleares/validate-request';
import { User } from '../models/users';
import { BadRequestError } from '../errors/bad-request-error';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';
const router = express.Router();


router.post('/api/users/signin', [
    body('email').isEmail().withMessage("Email must be valid!"),
    body('password').trim().notEmpty().withMessage("You must supply a password!")
], validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const existing = await User.findOne({  email });
    if(!existing){
        throw new BadRequestError("Invalid credentials");
    }

    const passwordsMatch = await Password.compare(existing.password, password);
    if(!passwordsMatch){
        throw new BadRequestError("Invalid credentials");
    }

    const userJwt = jwt.sign({
        id: existing.id,
        email: existing.email
    }
    , process.env.JWT_KEY!
    );

    req.session = {
        jwt: userJwt
    };

    res.status(200).send({message: "Success"});
});

export { router as signinRouter };