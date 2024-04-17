import { Client } from '@urql/core';
import React from 'react';

type C2CSubgraphContextType = {
  subgraphQuery: Client;
  setSubgraphQuery: React.Dispatch<React.SetStateAction<Client>>;
};

const C2CSubgraphContext = React.createContext<C2CSubgraphContextType>(null);

const C2CSubgraphProvider = ({ children }) => {
  const [subgraphQuery, setSubgraphQuery] = React.useState<Client>();

  return (
    <C2CSubgraphContext.Provider value={{ subgraphQuery, setSubgraphQuery }}>
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
