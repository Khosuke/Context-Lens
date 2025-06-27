export interface GraphNode {
  id: string;
  label: string;
  url?: string;
}

export interface GraphEdge {
  source: string;
  target: string;
}

export interface TavilyResult {
  title: string;
  url: string;
  content: string;
}
