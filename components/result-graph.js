import * as d3 from "https://cdn.skypack.dev/d3@7";

class ResultGraph extends HTMLElement {
  static get observedAttributes() {
    return ['data'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.width = 600;
    this.height = 400;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'data') {
      try {
        const graph = JSON.parse(newValue);
        this.renderGraph(graph);
      } catch (e) {
        this.shadowRoot.innerHTML = `<p style="color:red">Invalid graph data</p>`;
      }
    }
  }

  renderGraph({ nodes, edges }) {
    this.shadowRoot.innerHTML = ''; // Clear old content
    const svg = d3.create("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .style("background", "#1e1e1e");

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(edges).id(d => d.id).distance(120))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(this.width / 2, this.height / 2));

    const link = svg.append("g")
      .selectAll("line")
      .data(edges)
      .join("line")
      .attr("stroke", "#6366F1")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 2);

    const node = svg.append("g")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 10)
      .attr("fill", d => d.id === 'query' ? "#6366F1" : "#fff")
      .style("cursor", "pointer")
      .on("click", (event, d) => {
        if (d.url) window.open(d.url, "_blank");
      })
      .append("title")
      .text(d => `${d.label}\n${d.url ?? ''}`);

    const label = svg.append("g")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .text(d => d.label)
      .attr("font-size", "12px")
      .attr("fill", "#fff")
      .attr("text-anchor", "middle");

    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      svg.selectAll("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);

      label
        .attr("x", d => d.x)
        .attr("y", d => d.y - 15);
    });

    this.shadowRoot.appendChild(svg.node());
  }
}

customElements.define('result-graph', ResultGraph);
