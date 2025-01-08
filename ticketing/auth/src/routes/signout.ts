import express, { NextFunction, Request, Response } from 'express';
const router = express.Router();

router.post('/api/users/signout', (req: Request, res: Response, next: NextFunction) => {
    req.session = null;
    res.send({message: "Success"});
});

export { router as signoutRouter };