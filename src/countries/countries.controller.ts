import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Connection, EntityManager } from "typeorm";
import { Country } from "./country.entity";

@ApiTags('Countries')
@Controller('countries')
export class CountriesController {
  private readonly entityManager: EntityManager;

  constructor(
    connection: Connection
  ) {
    this.entityManager = connection.manager;
  }

  @Get()
  get() {
    return this.entityManager.find(Country);
  }

}
