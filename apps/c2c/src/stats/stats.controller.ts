import { Controller } from '@nestjs/common';
import { StatsService } from './stats.service';
import { JOBS } from '@rahataid/c2c-extensions';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @MessagePattern({ cmd: JOBS.REPORTING.LIST, uuid: process.env.PROJECT_ID })
  findAll() {
    return this.statsService.findAll();
  }

  @MessagePattern({ cmd: JOBS.REPORTING.GET, uuid: process.env.PROJECT_ID })
  findOne(@Payload() name: string) {
    return this.statsService.findOne(name);
  }
}
