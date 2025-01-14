import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { StatsService } from '../stats/stats.service';
import { EVENTS } from '@rahataid/c2c-extensions';
@Injectable()
export class ListenersService {
  constructor(private readonly statsService: StatsService) {}

  @OnEvent(EVENTS.DISBURSEMENT_CREATE)
  async onStatsUpdate() {
    console.log('********Stats Event triggered*******************');
    await this.statsService.saveAllStats();
  }
}
