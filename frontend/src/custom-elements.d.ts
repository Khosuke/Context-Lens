declare namespace JSX {
  interface IntrinsicElements {
    'result-graph': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      data?: string;
    };
  }
}
