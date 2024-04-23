import { Client } from '@urql/core';
import React, {
  FC,
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';

type C2CSubgraphContextType = {
  subgraphClient: Client;
  setSubgraphClient: Dispatch<SetStateAction<Client>>;
};

const C2CSubgraphContext = createContext<C2CSubgraphContextType | undefined>(
  undefined
);

type C2CSubgraphProviderProps = {
  children: React.ReactNode;
};

const C2CSubgraphProvider: FC<C2CSubgraphProviderProps> = ({ children }) => {
  const [subgraphClient, setSubgraphClient] = useState<Client>();

  return (
    <C2CSubgraphContext.Provider
      value={{
        subgraphClient: subgraphClient as Client,

        setSubgraphClient: setSubgraphClient as Dispatch<
          SetStateAction<Client>
        >,
      }}
    >
      {children}
    </C2CSubgraphContext.Provider>
  );
};

export default C2CSubgraphProvider;

export const useC2CSubgraph = (): C2CSubgraphContextType => {
  const context = useContext(C2CSubgraphContext);
  if (context === undefined) {
    throw new Error('useC2CSubgraph must be used within a C2CSubgraphProvider');
  }
  return context;
};
