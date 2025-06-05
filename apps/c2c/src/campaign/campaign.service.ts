import { Inject, Injectable } from '@nestjs/common';

import { paginator, PaginatorTypes, PrismaService } from '@rumsan/prisma';
import { TransportType, TriggerType } from '@rumsan/connect/src/types';
import {
  CreateCampaignDto,
  ListCommDto,
  ListSessionLogsDto,
  UpdateCampaignDto,
  // UpdateCVACommsDto,
} from '@rahataid/c2c-extensions';
import { ProjectContants } from '@rahataid/sdk';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { CommsClient } from '../comms/comms.service';

const paginate: PaginatorTypes.PaginateFunction = paginator({ perPage: 20 });

@Injectable()
export class CampaignService {
  constructor(
    private prisma: PrismaService,
    @Inject('COMMS_CLIENT')
    private commsClient: CommsClient,
    @Inject(ProjectContants.ELClient) private readonly client: ClientProxy // private eventEmitter: EventEmitter2
  ) {}

  async listSessionLogs(uuid: string, dto: ListSessionLogsDto) {
    const comm = await this.findOne(uuid);
    if (!comm) throw new RpcException('Communication not found');
    const { sessionId } = comm;
    if (!sessionId) throw new RpcException('Session not found');

    const k = await this.commsClient.session.listBroadcasts(sessionId, {
      params: dto,
    });
    const data = {
      data: k.data,
      meta: k.response.meta,
    };
    console.log(data);

    return data;
  }

  async listTransports() {
    const rows = await this.commsClient.transport.list();
    if (!rows?.data.length) return [];
    return rows.data.map((row) => {
      return {
        cuid: row.cuid,
        name: row.name,
        type: row.type,
      };
    });
  }

  async listBenef(projectID: string) {
    const beneficiaries = await firstValueFrom(
      this.client.send(
        { cmd: 'rahat.jobs.beneficiary.list_pii' },
        { projectId: projectID }
      )
    );
    const piiData = beneficiaries.data.map(
      (beneficiary: any) => beneficiary.piiData
    );
    return piiData;
  }

  pickPhoneOrEmail(beneficiaries: any[], type: string) {
    if (type === TransportType.SMTP) return beneficiaries.map((b) => b.email);
    else return beneficiaries.map((b) => b.phone);
  }

  async listBenefByGroup(groupUID: string) {
    const groupData = await lastValueFrom(
      this.client.send(
        { cmd: 'rahat.jobs.beneficiary.get_one_group_by_project' },
        groupUID
      )
    );
    const piiData = groupData.groupedBeneficiaries.map(
      (benGroup: any) => benGroup?.Beneficiary?.pii
    );
    return piiData;
  }

  async triggerCommunication(uuid: string) {
    const comm = await this.findOne(uuid);
    if (!comm) throw new RpcException('Communication not found');
    const { sessionId, transportId, message, groupUID } = comm;
    if (sessionId) throw new RpcException('Communication already triggered');
    const transport = await this.commsClient.transport.get(transportId);
    if (!transport) throw new RpcException('Transport not found');
    let beneficiaries;
    if (groupUID) {
      beneficiaries = await this.listBenefByGroup(groupUID);
    } else {
      beneficiaries = await this.listBenef(process.env['PROJECT_ID'] as string);
    }
    const addresses = this.pickPhoneOrEmail(
      beneficiaries,
      transport.data?.type
    );
    if (!addresses.length) throw new RpcException('No valid addresses found!');

    return this.broadcastMessages({
      uuid,
      addresses: addresses,
      msgContent: message,
      transportId,
    });
  }

  async getBroadcastLogs(dto: any) {
    const logs = await this.commsClient.broadcast.list(dto);
    return { data: logs.data, meta: logs.response.meta };
  }

  async broadcastMessages({ uuid, addresses, msgContent, transportId }: any) {
    const sessionData = await this.commsClient.broadcast.create({
      addresses: addresses,
      maxAttempts: 3,
      message: {
        content: msgContent,
        meta: {
          subject: 'INFO',
        },
      },
      options: {},
      transport: transportId,
      trigger: TriggerType.IMMEDIATE,
    });
    const session = sessionData.data;
    return this.updateCommSession(uuid, session.cuid);
  }

  async broadcastSms({ addresses, msgContent }: any) {
    const transport = (await this.listTransports()).find(
      (transport: any) => transport.name === process.env.TRANSPORT_NAME
    );

    const cuid = transport?.cuid || '';

    return await this.commsClient.broadcast
      .create({
        addresses: addresses,
        maxAttempts: 3,
        message: {
          content: msgContent,
          meta: {
            subject: 'INFO',
          },
        },
        options: {},
        transport: cuid,
        trigger: TriggerType.IMMEDIATE,
      })
      .catch((e) => new RpcException(e.message));
  }

  async updateCommSession(uuid: string, sessionId: string) {
    return this.prisma.campaign.update({
      where: { uuid },
      data: {
        sessionId,
      },
    });
  }

  async create(dto) {
    try {
      return this.prisma.campaign.create({
        data: {
          ...dto,
        },
      });
    } catch (e) {
      console.log(e);

      throw new RpcException(e.message);
    }
  }

  async update(updateCVACommsDto: UpdateCampaignDto) {
    try {
      return this.prisma.campaign.update({
        where: { uuid: updateCVACommsDto.uuid },
        data: updateCVACommsDto,
      });
    } catch (e) {
      console.log(e);
      throw new RpcException(e.message);
    }
  }

  findAll(query: ListCommDto) {
    const conditions = {} as any;
    if (query?.name) {
      conditions['name'] = { contains: query.name, mode: 'insensitive' } as any;
    }

    if (query?.transportId) {
      conditions['transportId'] = {
        contains: query.transportId,
      } as any;
    }
    return paginate(
      this.prisma.campaign,
      {
        where: conditions,
        orderBy: { createdAt: query?.order },
      },
      {
        page: query.page,
        perPage: query.perPage,
      }
    );
  }

  findOne(uuid: string) {
    return this.prisma.campaign.findUnique({
      where: { uuid },
    });
  }
}
