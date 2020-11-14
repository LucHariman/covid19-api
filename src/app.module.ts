import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleModule } from 'nestjs-console';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataImportModule } from './data-import/data-import.module';

@Module({
  imports: [
    ConsoleModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'grespost',
      database: 'covid19',
      entities: ['**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    DataImportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
