// CodeSnippet.js
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeSnippet = ({ language, code }) => (
  <SyntaxHighlighter language={language} style={nightOwl}>
    {code}
  </SyntaxHighlighter>
);
export default CodeSnippet;
