import React, { useEffect, useRef } from 'react';

interface GraphWrapperProps {
  data: any;
}

const GraphWrapper: React.FC<GraphWrapperProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data || !containerRef.current) return;

    containerRef.current.innerHTML = ''; // Clear any previous component

    const element = document.createElement('result-graph');
    element.setAttribute('data', JSON.stringify(data));
    containerRef.current.appendChild(element);
  }, [data]);

  return <div ref={containerRef} />;
};

export default GraphWrapper;
