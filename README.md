# Context Lens

**Context Lens** is a fullstack module designed to help industrial sales teams quickly evaluate whether a client project is "in scope".  
It provides a web-based graph view of related suppliers, patents, and news — built on top of a custom RAG + LLM pipeline and Tavily Search API.

---

## 🚀 Quick Start

```
git clone https://github.com/<your-org>/context-lens.git
cd context-lens
cp .env.example .env  # Add your Tavily API key here
docker-compose up -d
npm run e2e
open http://localhost:3000
```

The frontend is served at http://localhost:3000

The API is available at `GET /api/graph?query=<your-topic>`

# Features

- `GET /api/graph?query=...`: queries Tavily, builds a graph, and returns it along with a Web Component URL
- In-memory cache (15 min per query)
- Custom `<result-graph>` Web Component (D3.js) for graph display
- Dynamic import in React
- Clickable nodes (opens URL), hover for labels
- Fully Dockerized deployment
- Playwright E2E test included

# Testing

### Run E2E tests (Playwright)

```
npm run e2e
```

**Tests:**
- Search “solutions acoustiques de sonorisation”
- Verifies graph appears
- Ensures ≤ 15 nodes
- Validates data integrity


# Project Structure
```
Context-Lens/
├── backend/                    # Node.js + TypeScript API
│   └── src/
│       ├── index.ts            # Express server + route
│       ├── tavily.ts           # Tavily API call
│       ├── cache.ts            # In-memory cache
│       └── graphBuilder.ts     # Graph JSON builder
├── frontend/                   # Vite + React + Nginx
│   ├── src/                    # React UI
│   ├── components/             # Web Component (result-graph.js)
│   └── nginx.conf              # Serves index.html + static assets
├── docker-compose.yml          # Spins up backend + frontend
├── .env.example                # Tavily API Key placeholder
└── README.md
```

# Tech Stack
- Backend: Node.js, TypeScript, Express
- Frontend: Vite, React, Web Component (ES module)
- Graph: D3.js force-directed layout
- Testing: Playwright
- Deployment: Docker + Nginx
- Search API: Tavily

# Author

**Your Name**  
[GitHub](https://github.com/Khosuke) • [LinkedIn](https://linkedin.com/in/your-handle) • [Email](mailto:your@email.com)
