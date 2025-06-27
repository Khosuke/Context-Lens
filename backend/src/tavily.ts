import axios from 'axios';

export interface TavilyResult {
  title: string;
  url: string;
  content: string;
}

const TAVILY_API_KEY = process.env.TAVILY_API_KEY;

if (!TAVILY_API_KEY) {
  throw new Error('Tavily API key is missing in environment variables');
}

export async function fetchTavilyResults(query: string): Promise<TavilyResult[]> {
  try {
    const response = await axios.post(
      'https://api.tavily.com/search',
      {
        query,
        search_depth: 'basic',
        include_answer: false,
        include_raw_content: false,
        max_results: 10
      },
      {
        headers: {
          Authorization: `Bearer ${TAVILY_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Normalize the response
    const results = response.data.results || [];
    return results.map((r: any) => ({
      title: r.title,
      url: r.url,
      content: r.content ?? ''
    }));
  } catch (err: any) {
    if (err.response && err.response.status === 429) {
      const error = new Error('Tavily quota exceeded');
      (error as any).statusCode = 503;
      throw error;
    }

    console.error('Error calling Tavily API:', err.message || err);
    throw new Error('Failed to fetch Tavily results');
  }
}
