import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { fetchTavilyResults } from './tavily.js';
import { buildGraph } from './graphBuilder.js';
import { getFromCache, setInCache } from './cache.js';

dotenv.config();

const app = express();

app.get('/api/graph', async (req: Request, res: Response): Promise<void> => {
  const query = req.query.query as string;
  if (!query) {
    res.status(400).json({ error: 'Missing query parameter' });
    return;
  }

  const cached = getFromCache(query);
  if (cached) {
    res.json({
      graph: cached,
      componentUrl: "/components/result-graph.js"
    });
    return;
  }

  try {
    const results = await fetchTavilyResults(query);
    const graph = buildGraph(query, results);
    setInCache(query, graph);

    res.json({
      graph,
      componentUrl: "/components/result-graph.js"
    });
  } catch (err: any) {
    if (err.statusCode === 503) {
      res.status(503).json({ error: 'Tavily quota exceeded' });
      return;
    }
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(3001, () => {
  console.log('API listening on http://localhost:3001');
});
