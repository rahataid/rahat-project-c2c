import { Test, TestingModule } from '@nestjs/testing';
import { DisbursementService } from './disbursement.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { PrismaService } from '@rumsan/prisma';
// import { ClientProxy } from '@nestjs/microservices';
import { CreateDisbursementDto, UpdateDisbursementDto, DisbursementBenefeciaryCreate } from '@rahataid/c2c-extensions/dtos';
import { DisbursementStatus } from '@prisma/client';
import { randomUUID } from 'crypto';

// Mock types
interface MockPrismaService {
    disbursement: {
        create: jest.Mock;
        findUnique: jest.Mock;
        update: jest.Mock;
        disbursementBeneficiary: {
            create: jest.Mock;
            findMany: jest.Mock;
        };
    };
    disbursementBeneficiary: {
        create: jest.Mock;
        findMany: jest.Mock;
        upsert: jest.Mock;
        Disbusement:{
            type: string;
        }
    };
}

interface MockClient {
    send: jest.Mock;
}

describe('DisbursementService', () => {
    let service: DisbursementService;
    let prisma: MockPrismaService;
    let client: MockClient;

    const mockPrismaService: MockPrismaService = {
        disbursement: {
            create: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            disbursementBeneficiary: {
                create: jest.fn(),
                findMany: jest.fn(),
            },
        },
        disbursementBeneficiary: {
            create: jest.fn(),
            findMany: jest.fn(),
            upsert: jest.fn(),
            Disbusement: {
                type: 'PROJECT', // Mock the return value
            },

        },
    };

    const mockClient: MockClient = {
        send: jest.fn(),
    };
    const mockEventEmitter = {
        emit: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DisbursementService,
                { provide: PrismaService, useValue: mockPrismaService },
                { provide: 'EL_PROJECT_CLIENT', useValue: mockClient },
                { provide: EventEmitter2, useValue: mockEventEmitter }, // Add this line

            ],
        }).compile();

        service = module.get<DisbursementService>(DisbursementService);
        prisma = mockPrismaService;
        client = mockClient;
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });


    it('should find a disbursement by UUID', async () => {
        const mockUUID = randomUUID();
        const mockDisbursement = { uuid: mockUUID, amount: '100' };
        prisma.disbursement.findUnique.mockResolvedValue(mockDisbursement);

        const result = await service.findOne({ disbursementUUID: mockUUID });
        expect(result).toEqual(mockDisbursement);
        expect(prisma.disbursement.findUnique).toHaveBeenCalledWith({
            where: { uuid: mockUUID },
            include: { DisbursementBeneficiary: true, _count: { select: { DisbursementBeneficiary: true } } },
        });
    });

    it('should update a disbursement', async () => {
        const updateDisbursementDto: UpdateDisbursementDto = { id: 2, amount: '200' };
        const mockId = 1;
        prisma.disbursement.update.mockResolvedValue({ id: mockId, ...updateDisbursementDto });

        const result = await service.update(mockId, updateDisbursementDto);
        expect(result).toEqual({ id: mockId, ...updateDisbursementDto });
        expect(prisma.disbursement.update).toHaveBeenCalledWith({
            where: { id: mockId },
            data: updateDisbursementDto,
        });
    });

    // it('should create a disbursement', async () => {
    //     const mockBeneficiary: DisbursementBenefeciaryCreate = {
    //         amount: '100',
    //         from: 'some-address',
    //         transactionHash: 'some-hash',
    //         walletAddress: 'some-wallet-address',
    //     };
    //     const createDisbursementDto: CreateDisbursementDto = {
    //         amount: '100',
    //         beneficiaries: [mockBeneficiary],
    //         from: 'some-from-address',
    //         transactionHash: 'some-transaction-hash',
    //         status: DisbursementStatus.PENDING,
    //         timestamp: new Date().toISOString(),
    //         type: 'MULTISIG',
    //     };
    //     const mockDisbursement = { id: 1, ...createDisbursementDto };

    //     prisma.disbursement.create.mockResolvedValue(mockDisbursement);
    //     prisma.disbursement.disbursementBeneficiary.create.mockResolvedValue(mockBeneficiary);

    //     const result = await service.create(createDisbursementDto);
    //     expect(prisma.disbursement.create).toHaveBeenCalled();
    //     // expect(prisma.disbursement.disbursementBeneficiary.create).toHaveBeenCalledWith({
    //     //     data: mockBeneficiary,
    //     // });
    // });


});