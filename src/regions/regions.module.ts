import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from './region.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Region])]
})
export class RegionsModule {}
