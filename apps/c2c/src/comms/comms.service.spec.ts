import { Test, TestingModule } from '@nestjs/testing';
import { CommsService } from './comms.service';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, of } from 'rxjs';
import { getClient } from '@rumsan/connect/src/clients';

jest.mock('@rumsan/connect/src/clients', () => ({
    getClient: jest.fn(),
}));

describe('CommsService', () => {
    let service: CommsService;
    let coreClient: ClientProxy;
    let mockClient: any;

    const mockCommunicationSettings = {
        value: {
            URL: 'http://example.com',
            APP_ID: 'test-app-id',
        },
    };

    beforeEach(async () => {
        coreClient = {
            send: jest.fn().mockReturnValue(of([mockCommunicationSettings])),
            connect: jest.fn(),
            close: jest.fn(),
            routingMap: {},
            serializer: {},
        } as unknown as ClientProxy;

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommsService,
                { provide: 'CORE_CLIENT', useValue: coreClient },
            ],
        }).compile();

        service = module.get<CommsService>(CommsService);
        mockClient = { setAppId: jest.fn() };
        (getClient as jest.Mock).mockReturnValue(mockClient);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should initialize the client with communication settings', async () => {
        await service.init();

        expect(coreClient.send).toHaveBeenCalledWith(
            { cmd: 'appJobs.communication.getSettings' },
            {}
        );
        expect(getClient).toHaveBeenCalledWith({
            baseURL: mockCommunicationSettings.value['URL'],
        });
        expect(mockClient.setAppId).toHaveBeenCalledWith(mockCommunicationSettings.value['APP_ID']);
    });

    it('should handle errors during initialization', async () => {
        (coreClient.send as jest.Mock).mockReturnValueOnce(Promise.reject(new Error('Initialization error')));
        await expect(service.init()).rejects.toThrow('Initialization error');
    });

    it('should return the client after initialization', async () => {
        await service.init();
        const client = await service.getClient();
        expect(client).toBe(mockClient);
    });

    it('should return the existing client if already initialized', async () => {
        await service.init();
        const client1 = await service.getClient();
        const client2 = await service.getClient();
        expect(client1).toBe(client2);
    });
});