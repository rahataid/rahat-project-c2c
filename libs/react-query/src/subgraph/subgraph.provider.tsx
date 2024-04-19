import { Client } from '@urql/core';
import React from 'react';

type C2CSubgraphContextType = {
  subgraphClient: Client;
  setSubgraphClient: React.Dispatch<React.SetStateAction<Client>>;
};

const C2CSubgraphContext = React.createContext<C2CSubgraphContextType>(null);

const C2CSubgraphProvider = ({ children }) => {
  const [subgraphClient, setSubgraphClient] = React.useState<Client>();

  return (
    <C2CSubgraphContext.Provider value={{ subgraphClient, setSubgraphClient }}>
      {children}
    </C2CSubgraphContext.Provider>
  );
};

export default C2CSubgraphProvider;

export const useC2CSubgraph = (): C2CSubgraphContextType => {
  const context = React.useContext(C2CSubgraphContext);
  if (context === undefined) {
    throw new Error('useC2CSubgraph must be used within a C2CSubgraphProvider');
  }
  return context;
};
