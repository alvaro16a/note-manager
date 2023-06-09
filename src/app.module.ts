import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './note-organizer/infraestructure/database/database.module';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import { enviroments } from './enviroments';
import { InfraestructureModule } from './note-organizer/infraestructure/infraestructure.module';
import * as Joi from 'joi';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      isGlobal: true,
      load: [config],
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
      }),
    }),
    InfraestructureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
