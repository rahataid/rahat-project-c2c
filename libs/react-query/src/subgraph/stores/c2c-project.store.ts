import { localStore, zustandStore } from '@rumsan/react-query';
import { StoreApi, UseBoundStore } from 'zustand';

type C2CProjectState = {
  projectDetails: {
    balance: string;
  };
};

type C2CProjectActions = {
  setProjectDetails: (
    projectDetails: C2CProjectState['projectDetails']
  ) => void;
};

type C2CProjectStore = C2CProjectState & C2CProjectActions;

const initialState = {
  projectDetails: {
    balance: '0',
  },
};

export const useC2CProjectSubgraphStore: UseBoundStore<
  StoreApi<C2CProjectStore>
> = zustandStore<C2CProjectStore>(
  (set, get) => ({
    ...initialState,
    setProjectDetails: (projectDetails) =>
      set({
        projectDetails,
      }),
  }),
  {
    devtoolsEnabled: true,
    persistOptions: {
      name: 'c2c-project-subgraph',
      getStorage: () => localStore,
    },
  }
);
