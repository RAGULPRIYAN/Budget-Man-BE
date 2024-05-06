import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   const express = require("express");
//   await app.listen(5000);
//   app.enableCors({ credentials: true, origin: true });
//   app.use(express.json({ limit: "50mb" }));
//   app.use(express.urlencoded({ limit: "50mb", extended: true }));
//   app.setGlobalPrefix("api");
 
// }
// bootstrap();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const express = require("express");
  app.enableCors({ credentials: true, origin: true });
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.setGlobalPrefix("api");

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle("budget")
    .setDescription("The budget API description")
    .setVersion("1.0")
    .addTag("budget")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // fs.writeFileSync("./swagger-spec.json", JSON.stringify(document));
  SwaggerModule.setup("api", app, document);
  // await app.listen(process.env.PORT);
  await app.listen(5000);
}
bootstrap();

