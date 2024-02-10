import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import Markdown from "markdown-to-jsx";
import { fetchItems } from "../store";
import Spinner from "../components/Spinner";
import styled from "styled-components";
import Complexity from "../components/Complexity";
import ComplexityTooltip from "../components/ComplexityTooltip";
import Deprecated from "../components/Deprecated";

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
  letter-spacing: 0.5px;
  width: 100%;
  line-height: 1.8;
  text-align: justify;

  p {
    font-size: 1.3rem;
  }

  code {
    font-family: "InterSemiBold";
    font-size: 0.9rem;
    color: var(--main-color);
    border: 1px solid var(--main-color);
    background-color: var(--description-bg-color);
    padding: 3px 6px;
    border-radius: 4px;
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

const ItemDescription = (props) => {
  const { ds, itemid } = useParams();
  const { store } = props;
  const { items, language } = store;
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await fetchItems();
      setLoading(false);
    };

    if (Object.keys(items).length === 0) {
      fetchData();
    } else {
      const item = items[language][ds][`${ds}/${itemid}`];
      setItem(item);
      setLoading(false);
    }
  }, [items, language, ds, itemid]);

  const { title, content, tc, tcColor, sc, scColor, deprecated } = item;

  return (
    <>
      <Navbar type="item" />
      {Object.keys(item).length ? (
        <>
          <HeaderBlock>
            <ItemTitleBlock>
              <ItemTitle>
                {title}
              </ItemTitle>
              { deprecated && <Deprecated /> }
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
            <Markdown>{content}</Markdown>
          </MarkdownBlock>
        </>
      ) : (
        <></>
      )}
      <Spinner loading={loading} />
    </>
  );
};

export default ItemDescription;
