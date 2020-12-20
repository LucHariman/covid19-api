import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Connection, EntityManager } from "typeorm";
import { Country } from "./country.entity";

@ApiTags('Countries')
@Controller('countries')
export class CountriesController {
  private readonly entityManager: EntityManager;

  constructor(connection: Connection) {
    this.entityManager = connection.manager;
  }

  @Get()
  @ApiOkResponse({ type: [Country] })
  get() {
    return this.entityManager.find(Country);
  }

  @Get(':code')
  @ApiOkResponse({ type: Country })
  async getOne(@Param('code') code: string): Promise<Country> {
    code = code.toUpperCase();
    const country = await this.entityManager.findOne(Country, { where: [ { iso2: code }, { iso3: code } ] });
    if (!country) {
      throw new NotFoundException('Country not found!');
    }
    return country;
  }

}
