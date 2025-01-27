import express from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';
import { currentUser, errorHandler } from '@rstech/ticketing-common';
import { NotFoundError } from '@rstech/ticketing-common';
import cookieSession from 'cookie-session';
import { createChargeRouter } from './routes/new';

const app = express();
app.set('trust proxy', true);
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}));

app.use(currentUser);

app.use(bodyParser.json());

app.use(createChargeRouter);

app.all('*', async (req, res, next) => {
    throw new NotFoundError();
})

app.use(errorHandler);

export { app };