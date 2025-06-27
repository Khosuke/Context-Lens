import React, { useState } from 'react';
import GraphWrapper from './graphWrapper.tsx';  


const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [graphData, setGraphData] = useState<any>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;

    const response = await fetch(`/api/graph?query=${encodeURIComponent(query)}`);
    const data = await response.json();

    if (response.ok) {
      console.log(data.componentUrl)
      // Dynamically import the Web Component if not already loaded
      await import(`${data.componentUrl}`);
      setGraphData(data.graph);
    } else {
      alert(data.error || 'Erreur serveur');
    }
  };

  return (
    <div style={{ background: '#1e1e1e', color: 'white', height: '100vh', padding: '2rem' }}>
      <img src="https://daryl-ai.com/wp-content/uploads/2025/04/DARYL_hwt.png" alt="logo" style={{ height: 40, marginBottom: 20 }} />
      <h1>Context Lens</h1>

      <div style={{ marginBottom: 20 }}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Ex: solutions acoustiques de sonorisation"
          style={{ padding: '0.5rem', width: '60%', fontSize: '1rem' }}
        />
        <button
          onClick={handleSearch}
          style={{
            marginLeft: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#6366F1',
            color: 'white',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Rechercher
        </button>
      </div>

      {graphData && <GraphWrapper data={graphData} />}

    </div>
  );
};

export default App;
