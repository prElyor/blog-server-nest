import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

const start = async () => {
  try {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Blog app')
        .setDescription(`Documentation for REST API`)
        .setVersion('1.0.0')
        .addTag('Elyor blog app')
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document)

    await app.listen(PORT, () => {
      console.log(`Server has been started in port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
