// CodeSnippet.js
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeSnippet = ({ language, code }) => (
  <SyntaxHighlighter language={language} style={a11yDark}>
    {code}
  </SyntaxHighlighter>
);
export default CodeSnippet;
