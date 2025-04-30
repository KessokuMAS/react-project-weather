import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";

// 카테고리 정보 배열
const categories = [
  { name: "main", text: "메인" },
  { name: "poll", text: "투표" },
  { name: "board", text: "게시판" },
  { name: "shop", text: "쇼핑" },
];

const CategoriesBlock = styled.div`
  display: flex;
  padding: 1rem;
  width: 768px;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
  }
`;

const Category = styled(NavLink)`
  flex: 1;
  text-align: center;
  font-size: 1.2rem;
  cursor: pointer;
  white-space: pre;
  text-decoration: none;
  color: inherit;
  padding-bottom: 0.25rem;

  &:hover {
    color: #495057;
  }

  &.main.active {
    font-weight: 600;
    border-bottom: 2px solid #266ec2;
    color: #266ec2;
    &:hover {
      color: #266ec2;
    }
  }

  &.poll.active {
    font-weight: 600;
    border-bottom: 2px solid #f4bd00;
    color: #f4bd00;
    &:hover {
      color: #f4bd00;
    }
  }

  &.board.active {
    font-weight: 600;
    border-bottom: 2px solid #dc0145;
    color: #dc0145;
    &:hover {
      color: #dc0145;
    }
  }

  &.shop.active {
    font-weight: 600;
    border-bottom: 2px solid #e46091;
    color: #e46091;
    &:hover {
      color: #e46091;
    }
  }

  & + & {
    margin-left: 0;
  }
`;

const Categories = () => {
  const location = useLocation();

  return (
    <CategoriesBlock>
      {categories.map((c) => {
        // 각 카테고리의 라우팅 경로 설정
        const to =
          c.name === "main"
            ? "/"
            : c.name === "board"
            ? "/board/free"
            : c.name === "weather"
            ? "/weather"
            : `/${c.name}`;

        const isActive =
          c.name === "board"
            ? location.pathname.startsWith("/board")
            : location.pathname === to;

        return (
          <Category
            key={c.name}
            to={to}
            className={`${c.name} ${isActive ? "active" : ""}`}
          >
            {c.text}
          </Category>
        );
      })}
    </CategoriesBlock>
  );
};

export default Categories;
