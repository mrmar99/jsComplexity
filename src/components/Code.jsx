import React, { useState } from "react";
import {
  Prism as SyntaxHighlighter,
  createElement,
} from "react-syntax-highlighter";
import { vscDarkPlus as codeStyle } from "react-syntax-highlighter/dist/esm/styles/prism";
import styled from "styled-components";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useUnit } from "effector-react";
import $store from "../store";
import { nanoid } from "nanoid";

const PreContainer = styled.div`
  margin: 1.5rem 0 !important;
`;

const CopyBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--description-bg-color);
  width: 100%;
  border-radius: 8px 8px 0 0;
  padding: 0.3rem 0.4rem 0 1rem;
  color: var(--main-color);
`;

const Language = styled.span``;

const CopyButton = styled.button`
  font-family: "InterRegular";
  background-color: transparent;
  margin: 0;
  padding: 0.2rem 0.4rem;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid var(--main-color);
  color: var(--main-color);
  opacity: 0.6;
  transition: opacity 0.1s ease-in;

  &:hover {
    opacity: 1;
    transition: opacity 0.1s ease-out;
  }
`;

const PreBlock = styled(SyntaxHighlighter)`
  background-color: var(--description-bg-color) !important;
  border: none !important;
  user-select: text;
  border-radius: 0 0 8px 8px;
  padding: 0.6rem 1rem 1.2rem 1rem !important;
  margin-top: 0 !important;

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
    tab-size: 2 !important;
    line-height: 0.7 !important;
  }

  code span.line-number {
    padding-right: 1rem !important;
  }

  code a {
    font-size: 16px;
  }
`;

const Code = ({ children, ...props }) => {
  const store = useUnit($store);
  const { items, language } = store;

  const ECMAScriptSlug = "ECMAScript";

  const { item } = props;
  const parsedMethods = new Set(item.parsedMethods);
  const ECMAScriptMethods = new Set(
    Object.values(items[language][ECMAScriptSlug]).map((v) => v.title)
  );

  const { className: preClassName, children: preChildren } = children.props;
  const syntaxLanguage =
    (preClassName && preClassName.replace("lang-", "")) || "";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const traverseRow = (row, prev) => {
    if (row.type === "element") {
      if (row.children && row.children.length > 0) {
        row.children.forEach((child) => {
          traverseRow(child, row);
        });
      }
    } else if (row.type === "text") {
      const method = row.value + '()';

      if (parsedMethods.has(method) && ECMAScriptMethods.has(method)) {
        prev.tagName = "a";
        prev.properties = {
          ...prev.properties,
          href: `/${ECMAScriptSlug}/${method}`,
          title: `ECMAScript ${method}`
        };
      }
    }
  };

  const rowRenderer = (row, stylesheet, useInlineStyles) => {
    traverseRow(row, row);

    return createElement({
      node: row,
      stylesheet,
      useInlineStyles,
      key: nanoid(),
    });
  };

  const renderer = ({ ...props }) => {
    const { rows, stylesheet, useInlineStyles } = props;
    return rows.map((row) => rowRenderer(row, stylesheet, useInlineStyles));
  };

  return (
    <PreContainer>
      <CopyBlock>
        <Language>{syntaxLanguage}</Language>
        <CopyToClipboard text={preChildren} onCopy={handleCopy}>
          <CopyButton>{copied ? "Copied!" : "Copy"}</CopyButton>
        </CopyToClipboard>
      </CopyBlock>
      <PreBlock
        {...props}
        children={preChildren}
        language={syntaxLanguage}
        style={codeStyle}
        renderer={renderer}
        wrapLongLines
      />
    </PreContainer>
  );
};

export default Code;
