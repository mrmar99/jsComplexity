import React from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import Markdown from "markdown-to-jsx";
import styled from "styled-components";
import Complexity from "../components/Complexity";
import ComplexityTooltip from "../components/ComplexityTooltip";
import Deprecated from "../components/Deprecated";
import githubSvg from "../svg/github.svg";
import { useUnit } from "effector-react";
import $store from "../store";
import Code from "../components/Code";

const ItemTitleBlock = styled.div`
  margin-bottom: 0.5rem;
  display: inline-flex;
  align-items: center;
  gap: 1rem;
`;

const ItemTitle = styled.h1`
  font-family: "InterExtraBold";
  font-size: 3rem;

  @media (max-width: 780px) {
    font-size: 1.7rem;
  }
`;

const MarkdownBlock = styled.div`
  font-family: "InterRegular";
  letter-spacing: 0.2px;
  width: 100%;
  line-height: 1.8;
  text-align: justify;

  code:not(pre code) {
    background-color: var(--description-bg-color);
    padding: 3px 5px;
    font-size: 1.1rem;
    border-radius: 8px;
    border: 1px solid var(--main-color);
    user-select: text;
  }

  p {
    font-size: 1.1rem;
    margin: 1rem 0;
  }

  & * {
    margin-top: 0.35rem;
  }

  & *:first-child {
    margin-top: 0;
  }
`;

const HeaderBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3.5rem;
  margin-bottom: 2rem;
  user-select: none;
  align-items: flex-start;
  gap: 1rem;

  @media (max-width: 780px) {
    margin-top: 2.5rem;
  }
`;

const Complexities = styled.div`
  display: flex;
  gap: 1rem;
`;

const ComplexityBlock = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--description-bg-color);
  border-radius: 12px;
  padding: 0.5rem 0.5rem 0.5rem 1rem;

  span {
    font-family: "InterRegular";
    font-size: 1.5rem;
    margin-right: 1rem;
  }
`;

const GithubIcon = styled.img.attrs({
  src: `${githubSvg}`,
})`
  width: 24px;
`;

const GithubLink = styled.a`
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: var(--description-bg-color);
  width: max-content;
  padding: 0.75rem;
  border-radius: 8px;
  color: var(--main-color);
`;

const ItemDescription = () => {
  const { ds, itemid } = useParams();
  const store = useUnit($store);
  const { items, language } = store;
  const item = items[language][ds][`${ds}/${itemid}`];

  const { title, content, tc, tcColor, sc, scColor, deprecated } = item;

  const capitalizedDs = ds.charAt(0).toUpperCase() + ds.slice(1);
  const linkToGithub = `https://github.com/mrmar99/jsComplexity/edit/master/src/content/${capitalizedDs}/${title.replaceAll(
    ".",
    "-"
  )}/${language}.md`;
  const editOnGithubText = {
    ru: "Редактировать на GitHub",
    en: "Edit on GitHub",
  };

  return (
    <>
      <Navbar type="item" />
      {Object.keys(item).length ? (
        <>
          <HeaderBlock>
            <ItemTitleBlock>
              <ItemTitle>{title}</ItemTitle>
              {deprecated && <Deprecated />}
            </ItemTitleBlock>
            <Complexities>
              <ComplexityTooltip type="tc">
                <ComplexityBlock>
                  <span>TC</span> <Complexity title={tc} color={tcColor} />
                </ComplexityBlock>
              </ComplexityTooltip>
              <ComplexityTooltip type="sc">
                <ComplexityBlock>
                  <span>SC</span> <Complexity title={sc} color={scColor} />
                </ComplexityBlock>
              </ComplexityTooltip>
            </Complexities>
          </HeaderBlock>
          <MarkdownBlock>
            <Markdown
              options={{
                overrides: {
                  pre: {
                    component: Code,
                  }
                }
              }}
            >
              {content}
            </Markdown>
          </MarkdownBlock>
          <GithubLink href={linkToGithub} target="_blank">
            <GithubIcon />
            {editOnGithubText[language]}
          </GithubLink>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default ItemDescription;
