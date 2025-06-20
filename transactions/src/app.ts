import express from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { currentUser, errorHandler, rateLimiter } from '@liranmazor/ticketing-common';
import { healthRouter } from './routes/health';

const app = express();
app.set('trust proxy', true);

app.use(rateLimiter as any);

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

app.use(currentUser);

app.use(healthRouter);

app.use(errorHandler as any);

export { app };