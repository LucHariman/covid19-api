import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiProperty, ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min, ValidateNested } from 'class-validator';
import { Repository } from 'typeorm';
import { Region } from './region.entity';

class ListQuery {
  @ApiPropertyOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  @IsOptional()
  itemsPerPage?: number;
}

class ListResult {
  @ApiProperty()
  page: number;

  @ApiProperty()
  itemsPerPage: number;

  @ApiProperty({ type: [Region] })
  entries: Region[];
}

@ApiTags('Regions')
@Controller('regions')
export class RegionsController {
  constructor(
    @InjectRepository(Region)
    private regionsRepository: Repository<Region>
  ) {}

  @Get()
  @ApiOkResponse({ type: ListResult })
  async get(@Query() { page, itemsPerPage }: ListQuery): Promise<ListResult> {
    page = page || 1;
    itemsPerPage = itemsPerPage || 30;
    const entries = await this.regionsRepository.find({ skip: (page - 1) * itemsPerPage, take: itemsPerPage });
    return { page, itemsPerPage, entries };
  }
}
