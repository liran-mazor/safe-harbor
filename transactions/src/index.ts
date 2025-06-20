import { app } from './app';
import { natsClient } from './lib/nats-client';
import { prisma } from './lib/prisma-client';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL must be defined');
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLIENT_ID must be defined');
  }
  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL must be defined');
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID must be defined');
  }
  if (!process.env.QUEUE_GROUP_NAME) {
    throw new Error('QUEUE_GROUP_NAME must be defined');
  }

  try {

    await prisma.$connect();
    console.log('Connected to PostgreSQL');
    
    await natsClient.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    natsClient.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });

    process.on('SIGINT', () => natsClient.client.close());
    process.on('SIGTERM', () => natsClient.client.close());
    

  } catch (err) {
    console.error(err);
  }
  app.listen(3000, () => {
    console.log('Listening on port 3000');
  });

};

start();