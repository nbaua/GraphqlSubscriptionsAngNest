import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3000; // Get it using process.env.APP_PORT for production build

  app.enableCors();

  await app.listen(port);

  console.log(`Nest application started on port ${port}`);
  console.log(`GraphQl API started at http://localhost:${port}/graphql`);
}
bootstrap();
