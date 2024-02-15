import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus as codeStyle } from "react-syntax-highlighter/dist/esm/styles/prism";
import styled from "styled-components";
import { CopyToClipboard } from "react-copy-to-clipboard";

const PreContainer = styled.div`
  margin: 1.5rem 0 !important;
  position: relative;
`;

const PreBlock = styled(SyntaxHighlighter)`
  background-color: var(--description-bg-color) !important;
  border: none !important;
  user-select: text;
  border-radius: 8px;
  line-height: 1 !important;
  tab-size: 2 !important;

  &::-webkit-scrollbar {
    background-color: var(--description-bg-color);
    height: 10px;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb:horizontal {
    background-color: var(--secondary-color);
    border-radius: 10px;
  }

  code {
    font-family: "JetBrainsMonoExtraLight" !important;
  }
`;

const CopyButton = styled.button`
  font-family: "InterRegular";
  position: absolute;
  background-color: transparent;
  top: 0.25rem;
  right: 0.5rem;
  padding: 0.25rem 0.5rem;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid var(--main-color);
  color: var(--main-color);
`;

const Code = ({ children, ...props }) => {
  const { className: preClassName, children: preChildren } = children.props;
  const language = (preClassName && preClassName.replace("lang-", "")) || "";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <PreContainer>
      <PreBlock
        {...props}
        children={preChildren}
        language={language}
        style={codeStyle}
        showLineNumbers={true}
      />
      <CopyToClipboard text={preChildren} onCopy={handleCopy}>
        <CopyButton>{copied ? "Copied!" : "Copy"}</CopyButton>
      </CopyToClipboard>
    </PreContainer>
  );
};

export default Code;
