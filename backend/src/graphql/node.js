import { fromGlobalId, nodeDefinitions } from 'graphql-relay';

const nodeFetchers = new Map;

export function registerNodeFetcher(type, fetcher) {
  if (nodeFetchers.has(type)) {
    throw new Error(`Node fetcher for type "${type}" have already been registered.`);
  }

  nodeFetchers.set(type, fetcher);
}

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId, info) => {
    const { type, id } = fromGlobalId(globalId);

    const fetcher = nodeFetchers.get(type);
    if (!fetcher) {
      throw new Error(`Node fetcher for type "${type}" is not registered.`);
    }

    return fetcher(id, info);
  }
);

export { nodeInterface, nodeField };
