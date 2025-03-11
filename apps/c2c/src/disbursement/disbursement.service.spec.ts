import { Test, TestingModule } from '@nestjs/testing';
import { DisbursementService } from './disbursement.service';
import { PrismaService } from '@rumsan/prisma';
// import { ClientProxy } from '@nestjs/microservices';
import { CreateDisbursementDto, UpdateDisbursementDto, DisbursementTransactionDto } from '@rahataid/c2c-extensions/dtos';
// import { DisbursementStatus } from '@prisma/client';
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
    };

    const mockClient: MockClient = {
        send: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DisbursementService,
                { provide: PrismaService, useValue: mockPrismaService },
                { provide: 'EL_PROJECT_CLIENT', useValue: mockClient },
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
        const updateDisbursementDto: UpdateDisbursementDto = { id: 2, amount: 200 };
        const mockId = 1;
        prisma.disbursement.update.mockResolvedValue({ id: mockId, ...updateDisbursementDto });

        const result = await service.update(mockId, updateDisbursementDto);
        expect(result).toEqual({ id: mockId, ...updateDisbursementDto });
        expect(prisma.disbursement.update).toHaveBeenCalledWith({
            where: { id: mockId },
            data: updateDisbursementDto,
        });
    });



}); 