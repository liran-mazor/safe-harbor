import express from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signoutRouter } from './routes/signout';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { errorHandler } from '@liranmazor/ticketing-common';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
   cookieSession({
     signed: false,
     secure: process.env.NODE_ENV !== 'test',
     httpOnly: true,                   
     sameSite: 'lax',        
     maxAge: 24 * 60 * 60 * 1000
   })
 );

app.use(currentUserRouter);
app.use(signoutRouter);
app.use(signinRouter);
app.use(signupRouter);

app.use(errorHandler as any);

export { app };