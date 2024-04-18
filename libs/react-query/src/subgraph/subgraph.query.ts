import { useC2CSubgraph } from './subgraph.provider';
import { useQuery } from '@tanstack/react-query';
import { useRSQuery } from '@rumsan/react-query';
import { ProjectDetails } from './graph.query';

export const useProjectDetails = (projectAddress: string) => {
  const { subgraphClient } = useC2CSubgraph();
  const { queryClient } = useRSQuery();

  const query = useQuery(
    {
      queryKey: ['ProjectDetails', projectAddress],
      queryFn: async () => {
        const { data } = await subgraphClient.query(ProjectDetails, {
          projectAddress,
        });
        return data;
      },
    },
    queryClient
  );

  return query;
};
