export const NAMESPACE = 'rahat.projects';

export const CONTROLLERS = {
  VENDOR: {
    CREATE: NAMESPACE + '.vendor.create',
    LIST: NAMESPACE + '.vendor.list',
    LISTONE: NAMESPACE + '.vendor.listone',
    UPDATE: NAMESPACE + '.vendor.update',
    BLOCKCHAIN: NAMESPACE + '.vendor.blockchain',
  },
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
    REDEEM_VOUCHER:'elProject.redeemVoucher',
    PROCESS_OTP:'elProject.processOtp'
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
    GET: 'rahat.jobs.beneficiary.get',
    UPDATE: 'rahat.jobs.beneficiary.update',
    REFER: 'rahat.jobs.beneficiary.get_referred',
    ADD_TO_PROJECT: 'rahat.jobs.beneficiary.add_to_project',
    BULK_ASSIGN_TO_PROJECT:'rahat.jobs.beneficiary.bulk_assign',

  },
  VENDOR: {
    CREATE: 'rahat.jobs.vendor.add_to_project',
    LIST: 'rahat.jobs.vendor.list',
    GET: 'rahat.jobs.vendor.get',
    UPDATE: 'rahat.jobs.vendor.update',
  },
  PROJECT: {
    CREATE: 'rahat.jobs.project.create',
    LIST: 'rahat.jobs.project.list',
    GET: 'rahat.jobs.project.get',
    UPDATE: 'rahat.jobs.project.update',
    REDEEM_VOUCHER:'rahat.jobs.project.redeemVoucher',
    PROCESS_OTP:'rahat.jobs.project.otpProcess',
    ASSIGN_DISCOUNT_VOUCHER:'rahat.jobs.project.discountVoucher',
    REQUEST_REDEMPTION:'rahat.jobs.project.request_redemption',
    UPDATE_REDEMPTION:'rahat.jobs.project.update_redemption',
    LIST_REDEMPTION:'rahat.jobs.project.list_redemption',
    GET_VENDOR_REDEMPTION:'rahat.jobs.project.get_redemption_vendor',
    UPDATE_ADMIN:'rahat.jobs.project.add_admin'

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
};

export const APP = {
  SETTINGS: null,
  BENEFICIARY: {
    REFERRAL_LIMIT: 3,
    TYPES: {
      REFERRED: 'REFERRED',
      ENROLLED: 'ENROLLED',
    },
  },
};
