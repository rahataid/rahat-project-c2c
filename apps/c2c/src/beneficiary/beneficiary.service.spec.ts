import { Test, TestingModule } from '@nestjs/testing';
import { BeneficiaryService } from './beneficiary.service';
import { PrismaService } from '@rumsan/prisma';
import { randomUUID } from 'crypto';


// Define a mock type for PrismaService
interface MockPrismaService {
  beneficiary: {
    findUnique: jest.Mock;
  };
}

// Define a mock type for the client
interface MockClient {
  send: jest.Mock;
}

// Define a mock type for EL_PROJECT_CLIENT
interface MockElProjectClient {
  send: jest.Mock;
}

describe('BeneficiaryService', () => {
  let service: BeneficiaryService;
  let prisma: PrismaService; // Use the mock type
  let client: MockClient; // Mock for the client
  let elProjectClient: MockElProjectClient; // Mock for EL_PROJECT_CLIENT
  let rsPrisma; // Mock for rsPrisma

  const mockPrismaService: MockPrismaService = {
    beneficiary: {
      findUnique: jest.fn(),
    },
  };

  const mockClient: MockClient = {
    send: jest.fn(),
  };

  const mockElProjectClient: MockElProjectClient = {
    send: jest.fn(),

  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BeneficiaryService,
        { provide: PrismaService, useValue: mockPrismaService }, // Use the mock directly
        { provide: 'EL_PROJECT_CLIENT', useValue: mockElProjectClient }, // Mock EL_PROJECT_CLIENT
        { provide: 'client', useValue: mockClient }, // Mock the client
      ],
    }).compile();

    service = module.get<BeneficiaryService>(BeneficiaryService);
    prisma = module.get<PrismaService>(PrismaService);
    client = mockClient; // Directly assign the mock client
    elProjectClient = mockElProjectClient; // Directly assign the mock client
    rsPrisma = prisma.rsclient;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find a beneficiary by UUID', async () => {
    const mockUUID = randomUUID();
    const mockBeneficiary = { uuid: mockUUID, name: 'Test Beneficiary' };
    (rsPrisma.beneficiary.findUnique as jest.Mock).mockResolvedValue(mockBeneficiary);
    const result = await service.findByUUID(mockUUID);
    expect(result).toEqual(mockBeneficiary);
    expect(prisma.beneficiary.findUnique).toHaveBeenCalledWith({ where: { uuid: mockUUID } });
  });



  // Add other tests as needed
});
