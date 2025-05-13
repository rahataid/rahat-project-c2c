import { Test, TestingModule } from '@nestjs/testing';
import { BeneficiaryService } from './beneficiary.service';
import { PrismaService } from '@rumsan/prisma';
import { randomUUID } from 'crypto';
import { of } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

// Define a mock type for PrismaService
interface MockPrismaService {
  beneficiary: {
    create: jest.Mock;
    createMany: jest.Mock;
    findUnique: jest.Mock;
    findMany: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
    count: jest.Mock; // Add count method
  };
  beneficiaryGroups: {
    findUnique: jest.Mock;
    create: jest.Mock;
    findMany: jest.Mock;
    count: jest.Mock;
  };
}

// Define a mock type for the client
interface MockClient {
  send: jest.Mock;
}

describe('BeneficiaryService', () => {
  let service: BeneficiaryService;
  let prisma: MockPrismaService; // Use the mock type
  let client: MockClient; // Mock for the client

  const mockPrismaService: MockPrismaService = {
    beneficiary: {
      create: jest.fn(),
      createMany: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(), 
    },
    beneficiaryGroups: {
      findUnique: jest.fn(),
      create: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(), 
    },
  };

  const mockClient: MockClient = {
    send: jest.fn(),
  };


  jest.mock('@rumsan/prisma', () => ({
    paginator: jest.fn().mockReturnValue({
      data: [
        { uuid: randomUUID(), name: 'Test Beneficiary 1' },
        { uuid: randomUUID(), name: 'Test Beneficiary 2' }
      ],
      meta: { total: 2, page: 1, perPage: 10 }
    }),
  }));


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BeneficiaryService,
        { provide: PrismaService, useValue: mockPrismaService }, // Use the mock directly
        { provide: 'EL_PROJECT_CLIENT', useValue: mockClient }, // Mock EL_PROJECT_CLIENT
      ],
    }).compile();

    service = module.get<BeneficiaryService>(BeneficiaryService);
    prisma = mockPrismaService; // Directly assign the mock service
    client = mockClient; // Directly assign the mock client
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a beneficiary', async () => {
    const dto = { uuid: randomUUID(), name: 'Test Beneficiary' };
    prisma.beneficiary.create.mockResolvedValue(dto);
    const result = await service.create(dto);
    expect(result).toEqual(dto);
    expect(prisma.beneficiary.create).toHaveBeenCalledWith({ data: dto });
  });

  it('should create many beneficiaries', async () => {
    const dto = [{ name: 'Test Beneficiary 1' }, { name: 'Test Beneficiary 2' }];
    prisma.beneficiary.createMany.mockResolvedValue(dto);
    const result = await service.createMany(dto);
    expect(result).toEqual(dto);
    expect(prisma.beneficiary.createMany).toHaveBeenCalledWith({ data: dto });
  });

  it('should find a beneficiary by UUID', async () => {
    const mockUUID = randomUUID();
    const mockBeneficiary = { uuid: mockUUID, name: 'Test Beneficiary' };
    prisma.beneficiary.findUnique.mockResolvedValue(mockBeneficiary);
    const result = await service.findByUUID(mockUUID);
    expect(result).toEqual(mockBeneficiary);
    expect(prisma.beneficiary.findUnique).toHaveBeenCalledWith({ where: { uuid: mockUUID } });
  });

  it('should update a beneficiary', async () => {
    const id = 1;
    const updateDto = { id, name: 'Updated Beneficiary' };
    const updatedBeneficiary = { id, ...updateDto };
    prisma.beneficiary.update.mockResolvedValue(updatedBeneficiary);
    const result = await service.update(id, updateDto);
    expect(result).toEqual(updatedBeneficiary);
    expect(prisma.beneficiary.update).toHaveBeenCalledWith({ where: { id }, data: updateDto });
  });

  it('should verify a wallet', async () => {
    const verifyDto = { walletAddress: '0x123' };
    const updatedBeneficiary = { walletAddress: '0x123', isVerified: true };
    prisma.beneficiary.update.mockResolvedValue(updatedBeneficiary);
    const result = await service.verfiyWallet(verifyDto);
    expect(result).toEqual(updatedBeneficiary);
    expect(prisma.beneficiary.update).toHaveBeenCalledWith({ where: { walletAddress: '0x123' }, data: { isVerified: true } });
  });

  it('should get one beneficiary group', async () => {
    const mockUUID = randomUUID();
    const mockGroup = { uuid: mockUUID, name: 'Test Group' };
    prisma.beneficiaryGroups.findUnique.mockResolvedValue(mockGroup);
    client.send.mockReturnValue(of(mockGroup.uuid));
    const result = await service.getOneGroup(mockUUID);
    expect(result).toEqual(mockGroup.uuid);
    expect(prisma.beneficiaryGroups.findUnique).toHaveBeenCalledWith({ where: { uuid: mockUUID, deletedAt: null } });
    expect(client.send).toHaveBeenCalledWith({ cmd: 'rahat.jobs.beneficiary.get_one_group_by_project' }, mockGroup.uuid);
  });

  it('should throw an error if beneficiary group not found', async () => {
    const mockUUID = randomUUID();
    prisma.beneficiaryGroups.findUnique.mockResolvedValue(null);
    await expect(service.getOneGroup(mockUUID)).rejects.toThrow(RpcException);
  });

  it('should add a group to project', async () => {
    const payload = { beneficiaryGroupData: { id: 1, uuid: randomUUID(), name: 'Test Group' } };
    prisma.beneficiaryGroups.create.mockResolvedValue(payload.beneficiaryGroupData);
    const result = await service.addGroupToProject(payload);
    expect(result).toEqual(payload.beneficiaryGroupData);
    expect(prisma.beneficiaryGroups.create).toHaveBeenCalledWith({ data: { uuid: payload.beneficiaryGroupData.uuid, name: payload.beneficiaryGroupData.name } });
  });

  it('should find all beneficiaries', async () => {
    const mockBeneficiaries = [
      { uuid: randomUUID(), name: 'Test Beneficiary 1' },
      { uuid: randomUUID(), name: 'Test Beneficiary 2' }
    ];
    const dto = { page: 1, perPage: 10, sort: 'name', order: 'asc' };
    prisma.beneficiary.findMany.mockResolvedValue(mockBeneficiaries);
    prisma.beneficiary.count.mockResolvedValue(mockBeneficiaries.length); // Mock count method
    const result = await service.findAll(dto);
    // expect(result).toEqual(mockBeneficiaries);
    // expect(prisma.beneficiary.findMany).toHaveBeenCalledWith({
    //   where: { deletedAt: null },
    //   skip: (dto.page - 1) * dto.perPage,
    //   take: dto.perPage,
    //   orderBy: { [dto.sort]: dto.order },
    // });
    expect(prisma.beneficiary.count).toHaveBeenCalled();
  });

  it('should get all groups', async () => {
    const mockGroups = [
      { uuid: randomUUID(), name: 'Group 1' },
      { uuid: randomUUID(), name: 'Group 2' }
    ];
    const dto = { page: 1, perPage: 10, sort: 'name', order: 'asc', name: 'Group' };
    prisma.beneficiaryGroups.findMany = jest.fn().mockResolvedValue(mockGroups);
    prisma.beneficiaryGroups.count = jest.fn().mockResolvedValue(mockGroups.length);
    client.send.mockReturnValue(of(mockGroups));

    const result = await service.getAllGroups(dto);

    expect(prisma.beneficiaryGroups.findMany).toHaveBeenCalledWith({
      where: {
        deletedAt: null,
        name: { contains: dto.name, mode: 'insensitive' }
      },
      orderBy: { [dto.sort]: dto.order },
      skip: (dto.page - 1) * dto.perPage,
      take: dto.perPage
    });
    expect(client.send).toHaveBeenCalledWith(
      { cmd: 'rahat.jobs.beneficiary.list_group_by_project' },
      expect.anything()
    );
  });

  it('should find all beneficiary PII', async () => {
    const mockData = {
      status: 'active',
      data: [
        { beneficiaryId: 'uuid1', Beneficiary: { name: 'John Doe' } },
        { beneficiaryId: 'uuid2', Beneficiary: { name: 'Jane Doe' } }
      ],
      meta: { total: 2, page: 1, perPage: 10 }
    };

    const mockProjectData = [
      { uuid: 'uuid1', name: 'John Doe', type: 'active' },
      { uuid: 'uuid2', name: 'Jane Doe', type: 'active' }
    ];

    prisma.beneficiary.findMany = jest.fn().mockResolvedValue(mockProjectData);

    const result = await service.findAllBeneficaryPii(mockData);

    expect(result).toEqual({
      data: [
        {
          beneficiaryId: 'uuid1',
          Beneficiary: { name: 'John Doe', uuid: 'uuid1', type: 'active' }
        },
        {
          beneficiaryId: 'uuid2',
          Beneficiary: { name: 'Jane Doe', uuid: 'uuid2', type: 'active' }
        }
      ],
      meta: mockData.meta
    });

    expect(prisma.beneficiary.findMany).toHaveBeenCalledWith({
      where: { type: mockData.status }
    });
  });

});