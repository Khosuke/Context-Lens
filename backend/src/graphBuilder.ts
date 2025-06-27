import { GraphNode, GraphEdge, TavilyResult } from './types';

export function buildGraph(query: string, results: TavilyResult[]): { nodes: GraphNode[], edges: GraphEdge[] } {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];

  // Central node
  const queryNode: GraphNode = {
    id: 'query',
    label: query
  };
  nodes.push(queryNode);

  // Result nodes
  results.forEach((result, index) => {
    const nodeId = `result-${index}`;

    nodes.push({
      id: nodeId,
      label: result.title,
      url: result.url
    });

    edges.push({
      source: queryNode.id,
      target: nodeId
    });
  });

  return { nodes, edges };
}
