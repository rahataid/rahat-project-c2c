import { DynamicModule, Global, Module } from '@nestjs/common';
import { CommsService } from './comms.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

// TODO: remove CORE_CLIENT
@Global()
@Module({})
export class CommsModule {
  static forRoot(): DynamicModule {
    return {
      module: CommsModule,
      global: true,
      imports: [
        ClientsModule.register([
          {
            name: 'CORE_CLIENT',
            transport: Transport.REDIS,
            options: {
              host: process.env.REDIS_HOST,
              port: +(process.env.REDIS_PORT || 6379),

              password: process.env.REDIS_PASSWORD,
            },
          },
        ]),
      ],
      providers: [
        CommsService,
        {
          provide: 'COMMS_CLIENT',
          useFactory: async (commsService: CommsService) => {
            await commsService.init();
            return commsService.getClient();
          },
          inject: [CommsService],
        },
      ],
      exports: ['COMMS_CLIENT'],
    };
  }
}
