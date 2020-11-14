import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleModule } from 'nestjs-console';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataImportModule } from './data-import/data-import.module';
import { RegionsModule } from './regions/regions.module';

@Module({
  imports: [
    ConsoleModule,
    TypeOrmModule.forRoot(),
    DataImportModule,
    RegionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
