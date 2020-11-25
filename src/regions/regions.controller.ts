import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Region } from './region.entity';

@Controller('regions')
export class RegionsController {
  constructor(
    @InjectRepository(Region)
    private regionsRepository: Repository<Region>
  ) {}

  // TODO: Add api documentation decorators
  @Get()
  get() {
    // TODO: Add filter parameters
    return this.regionsRepository.find();
  }
}
