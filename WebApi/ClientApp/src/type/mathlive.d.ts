// mathlive.d.ts (hoặc global.d.ts trong src/)
declare namespace JSX {
  interface IntrinsicElements {
    "math-field": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      virtualKeyboardMode?: string;
      value?: string;
    };
  }
}
