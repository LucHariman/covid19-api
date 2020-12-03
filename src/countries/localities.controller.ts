import { Controller, Get, NotFoundException, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse, ApiProperty, ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, Min } from 'class-validator';
import { FindConditions, ILike, Repository } from 'typeorm';
import { Locality } from './locality.entity';

const ALLOWED_SORT_VALUE = [ 'uid', 'combinedKey', 'admin2', 'state', 'region', 'iso2', 'iso3', 'population' ];
const ALLOWED_ORDER_VALUE = [ 'asc', 'desc' ];

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

  @ApiPropertyOptional({ enum: ALLOWED_SORT_VALUE })
  @IsIn(ALLOWED_SORT_VALUE)
  @IsOptional()
  sortBy?: string;

  @ApiPropertyOptional({ enum: ALLOWED_ORDER_VALUE })
  @IsIn(ALLOWED_ORDER_VALUE)
  @IsOptional()
  orderBy?: string;

  @ApiPropertyOptional()
  @IsOptional()
  q?: string;
}

class ListResult {
  @ApiProperty()
  page: number;

  @ApiProperty()
  itemsPerPage: number;

  @ApiProperty()
  totalItems: number;

  @ApiProperty({ type: [Locality] })
  entries: Locality[];
}

@ApiTags('Countries')
@Controller('localities')
export class LocalitiesController {
  constructor(
    @InjectRepository(Locality)
    private localitiesRepository: Repository<Locality>
  ) {}

  @Get()
  @ApiOkResponse({ type: ListResult })
  async get(@Query() { page, itemsPerPage, sortBy, orderBy, q }: ListQuery): Promise<ListResult> {
    page = page || 1;
    itemsPerPage = itemsPerPage || 30;
    sortBy = sortBy || 'uid';
    orderBy = orderBy === 'desc' ? 'DESC' : 'ASC';

    const order = {};
    order[sortBy] = orderBy;

    const where: FindConditions<Locality>[] = [];
    if (q) {
      q += '%';
      where.push({ state: ILike(q) }, { region: ILike(q) });
    }

    const [ entries, totalItems ] = await this.localitiesRepository.findAndCount({
      where,
      order,
      skip: (page - 1) * itemsPerPage,
      take: itemsPerPage
    });

    return { page, itemsPerPage, totalItems, entries };
  }

  @Get(':uid')
  @ApiOkResponse({ type: Locality })
  async getOne(@Param('uid', ParseIntPipe) uid: number): Promise<Locality> {
    const locality = await this.localitiesRepository.findOne({ uid });
    if (!locality) {
      throw new NotFoundException('Locality not found!');
    }
    return locality;
  }
}
