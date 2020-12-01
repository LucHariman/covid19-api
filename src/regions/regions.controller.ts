import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Region } from './region.entity';

@ApiTags('Regions')
@Controller('regions')
export class RegionsController {
  constructor(
    @InjectRepository(Region)
    private regionsRepository: Repository<Region>
  ) {}

  @Get()
  @ApiOkResponse({ type: Region, isArray: true })
  get() {
    // TODO: Add filter parameters
    return this.regionsRepository.find();
  }
}
