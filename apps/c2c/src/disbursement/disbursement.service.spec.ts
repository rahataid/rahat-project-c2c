import { Test, TestingModule } from '@nestjs/testing';
import { DisbursementService } from './disbursement.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { paginator, PrismaService } from '@rumsan/prisma';
import { ProjectContants } from '@rahataid/sdk';
import { CreateDisbursementDto, UpdateDisbursementDto, DisbursementBenefeciaryCreate } from '@rahataid/c2c-extensions/dtos';
import { DisbursementStatus, Prisma } from '@prisma/client';
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
        Disbursement:{
            type: string;
        }
    };
}

jest.mock('@rumsan/prisma', () => ({
    paginator: jest.fn().mockReturnValue(jest.fn().mockResolvedValue({
      data: [
        {
          amount: '100',
          Beneficiary: { name: 'John Doe', walletAddress: 'wallet1' },
          Disbursement: {
            status: 'COMPLETED',
            createdAt: new Date(),
            amount: '100',
            type: 'MULTISIG',
          },
        },
      ],
      meta: { total: 1, page: 1, perPage: 20 },
    })),
    PrismaService: jest.fn().mockImplementation(() => ({
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
            Disbursement: {
                type: 'PROJECT', // Mock the return value
            },
        },
    })),
  }));

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
            Disbursement: {
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
                { provide: 'EL_PROJECT_CLIENT', useValue: mockClient }, // Correctly mock ELClient
                { provide: EventEmitter2, useValue: mockEventEmitter },
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

    it('should create a disbursement', async () => {
        const mockBeneficiary: DisbursementBenefeciaryCreate = {
            amount: '100',
            from: 'some-address',
            transactionHash: 'some-hash',
            walletAddress: 'some-wallet-address',
        };
        const createDisbursementDto: CreateDisbursementDto = {
            amount: '100',
            beneficiaries: [mockBeneficiary],
            from: 'some-from-address',
            transactionHash: 'some-transaction-hash',
            status: DisbursementStatus.PENDING,
            timestamp: new Date().toISOString(),
            type: 'MULTISIG',
        };
        const mockDisbursement = { id: 1, ...createDisbursementDto };

        prisma.disbursement.create.mockResolvedValue(mockDisbursement);
        prisma.disbursement.disbursementBeneficiary.create.mockResolvedValue(mockBeneficiary);
        prisma.disbursementBeneficiary.upsert.mockResolvedValue({...mockBeneficiary, Disbursement:{type:'PROJECT'}});

        const result = await service.create(createDisbursementDto);
        expect(prisma.disbursement.create).toHaveBeenCalled();

    });
    
    it('should fetch disbursement transactions', async () => {
        const mockDisbursementDto = { disbursementUUID: randomUUID() }; // Example valid UUID
        const mockTransactions = [
          {
            amount: '100',
            Beneficiary: { name: 'John Doe', walletAddress: 'wallet1' },
            Disbursement: {
              status: 'COMPLETED',
              createdAt: new Date(),
              amount: '100',
              type: 'MULTISIG',
            },
          },
        ];
    
        prisma.disbursementBeneficiary.findMany = jest.fn().mockResolvedValue(mockTransactions);
    
        const result = await service.disbursementTransaction(mockDisbursementDto);

        expect(result.data.length).toEqual(mockTransactions.length); // Adjusted to compare only the data array
        expect(paginator).toHaveBeenCalled()
      });

    it('should fetch disbursement approvals', async () => {
        const mockDisbursementDto = { disbursementUUID: randomUUID() };
        const mockApprovals = [
            {
                amount: '100',
                Beneficiary: { name: 'Jane Doe', walletAddress: 'wallet2' },
                Disbursement: {
                    uuid: mockDisbursementDto.disbursementUUID,
                    status: DisbursementStatus.COMPLETED,
                    createdAt: new Date(),
                    amount: '100',
                    type: 'MULTISIG',
                },
            },
        ];

        prisma.disbursementBeneficiary.findMany = jest.fn().mockResolvedValue(mockApprovals);

        const result = await service.disbursementApprovals(mockDisbursementDto);

        expect(result.data.length).toEqual(mockApprovals.length);
        expect(paginator).toHaveBeenCalled();
    });

});