import { Test, TestingModule } from '@nestjs/testing';
import { CampaignService } from './campaign.service';
import { PrismaService } from '@rumsan/prisma';
import { CommsClient } from '../comms/comms.service';
import { ClientProxy } from '@nestjs/microservices';
import { RpcException } from '@nestjs/microservices';
import { of } from 'rxjs';

describe('CampaignService', () => {
    let service: CampaignService;
    let prismaService: PrismaService;
    let commsClient: CommsClient;
    let clientProxy: ClientProxy;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CampaignService,
                {
                    provide: PrismaService,
                    useValue: {
                        campaign: {
                            findUnique: jest.fn(),
                            update: jest.fn(),
                            create: jest.fn(),
                        },
                    },
                },
                {
                    provide: CommsClient,
                    useValue: {
                        session: {
                            listBroadcasts: jest.fn(),
                        },
                        transport: {
                            list: jest.fn(),
                            get: jest.fn(),
                        },
                        broadcast: {
                            create: jest.fn(),
                            list: jest.fn(),
                        },
                        broadcastLog: {
                            list: jest.fn(),
                        },
                    },
                },
                {
                    provide: 'COMMS_CLIENT',
                    useValue: {},
                },
                {
                    provide: 'ELClient',
                    useValue: {
                        send: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<CampaignService>(CampaignService);
        prismaService = module.get<PrismaService>(PrismaService);
        commsClient = module.get<CommsClient>(CommsClient);
        clientProxy = module.get<ClientProxy>('ELClient');
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('listSessionLogs', () => {
        it('should throw an error if communication is not found', async () => {
            jest.spyOn(prismaService.campaign, 'findUnique').mockResolvedValue(null);
            await expect(service.listSessionLogs('uuid', {})).rejects.toThrow(
                RpcException,
            );
        });

    });

    describe('listTransports', () => {
        it('should return an empty array if no transports are found', async () => {
            jest.spyOn(commsClient.transport, 'list').mockResolvedValue({ data: [] });
            const result = await service.listTransports();
            expect(result).toEqual([]);
        });

    });

    describe('listBenef', () => {
        it('should return piiData of beneficiaries', async () => {
            const beneficiaries = { data: [{ piiData: 'piiData1' }, { piiData: 'piiData2' }] };
            jest.spyOn(clientProxy, 'send').mockReturnValue(of(beneficiaries));
            const result = await service.listBenef('projectID');
            expect(result).toEqual(['piiData1', 'piiData2']);
        });

    });

    describe('triggerCommunication', () => {
        it('should throw an error if communication is not found', async () => {
            jest.spyOn(prismaService.campaign, 'findUnique').mockResolvedValue(null);
            await expect(service.triggerCommunication('uuid')).rejects.toThrow(
                RpcException,
            );
        });

    });

});
