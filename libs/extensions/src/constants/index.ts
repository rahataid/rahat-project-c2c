export const NAMESPACE = 'rahat.projects';

export const CONTROLLERS = {
  BENEFICIARY: {
    CREATE: NAMESPACE + '.beneficiary.create',
    LIST: NAMESPACE + '.beneficiary.list',
    LISTONE: NAMESPACE + '.beneficiary.listone',
    UPDATE: NAMESPACE + '.beneficiary.update',
  },
  PROJECT: {
    CREATE: NAMESPACE + '.project.create',
    LIST: NAMESPACE + '.project.list',
    LISTONE: NAMESPACE + '.project.listone',
    UPDATE: NAMESPACE + '.project.update',
    REMOVE: NAMESPACE + '.project.remove',
  },
  REPORTING: {
    LIST: NAMESPACE + '.reporting.projectlist',
  },
  APPSETTING: {
    CREATE: NAMESPACE + '.appsetting.create',
    LIST: NAMESPACE + '.appsetting.list',
    LISTONE: NAMESPACE + '.appsetting.listone',
    UPDATE: NAMESPACE + '.appsetting.update',
    REMOVE: NAMESPACE + '.appsetting.remove',
  },
};
export const QUEUE = {
  RAHAT: 'RAHAT',
  RAHAT_PROJECT: 'RAHAT_PROJECT',
};

export const JOBS = {
  BENEFICIARY: {
    CREATE: 'rahat.jobs.beneficiary.create',
    LIST: 'rahat.jobs.beneficiary.list',
    LIST_PROJECT_PII: 'rahat.jobs.beneficiary.list_project_pii',
    GET: 'rahat.jobs.beneficiary.get',
    UPDATE: 'rahat.jobs.beneficiary.update',
    ADD_TO_PROJECT: 'rahat.jobs.beneficiary.add_to_project',
    BULK_ASSIGN_TO_PROJECT: 'rahat.jobs.beneficiary.bulk_assign',
    VERIFY_SIGNATURE: 'rahat.jobs.beneficiary.verify_signature',
  },

  PROJECT: {
    CREATE: 'rahat.jobs.project.create',
    LIST: 'rahat.jobs.project.list',
    GET: 'rahat.jobs.project.get',
    UPDATE: 'rahat.jobs.project.update',
    UPDATE_ADMIN: 'rahat.jobs.project.add_admin',
  },
  REPORTING: {
    LIST: 'rahat.jobs.reporting.list',
  },
  SETTINGS: {
    CREATE: 'rahat.jobs.settings.create',
    LIST: 'rahat.jobs.settings.list',
    GET: 'rahat.jobs.settings.get',
    UPDATE: 'rahat.jobs.settings.update',
    REMOVE: 'rahat.jobs.settings.remove',
  },
  CAMPAIGN: {
    CREATE: 'rahat.jobs.campaign.create',
    LIST: 'rahat.jobs.campaign.list',
    GET: 'rahat.jobs.campaign.get',
    REMOVE: 'rahat.jobs.campaign.remove',
    GET_ALL_TRANSPORT: 'rahat.jobs.campaign.get_transport',
    GET_ALL_AUDIENCE: 'rahat.jobs.campaign.get_audience',
    TRIGGER_CAMPAIGN: 'rahat.jobs.campaign.trigger',
    GET_ALL_COMMUNICATION_LOGS: 'rahat.jobs.campaign.communication_logs',
    GET_ALL_COMMUNICATION_STATS: 'rahat.jobs.campaign.communication_stats',
    CREATE_AUDIENCE: 'rahat.jobs.campaign.create_audience',
  },
  DISBURSEMENT: {
    CREATE: 'rahat.jobs.disbursement.create',
    LIST: 'rahat.jobs.disbursement.list',
    LISTONE: 'rahat.jobs.disbursement.listone',
    UPDATE: 'rahat.jobs.disbursement.update',
    DISBURSEMENT_TRANSACTION: 'rahat.jobs.disbursement.transactions.get',
    DISBURSEMENT_APPROVAL: 'rahat.jobs.disbursement.approvals.get',
  },
  SAFE_TRANSACTION: {
    CREATE: 'rahat.jobs.safe_transaction.create',
    GET: 'rahat.jobs.safe_transaction.get',
  },
};

export const APP = {
  SETTINGS: null,
};
