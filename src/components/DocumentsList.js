import React from "react";
import styled from "styled-components";
import RecentIcon from "@atlaskit/icon/glyph/recent";
import IssuesIcon from "@atlaskit/icon/glyph/issues";
import { switchToEdit } from "../actions";

export const ListScrollContainer = styled.div`
  flex-grow: 1;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const ListItemWrapper = styled.div`
  padding: 18px 28px;
  border-bottom: 1px solid #ebecf0;

  &:hover {
    background: rgba(234, 230, 255, 0.6);
    cursor: pointer;
  }
`;

const ListExtraInfo = styled.div`
  margin-top: 12px;
  display: flex;

  > div {
    font-size: 80%;
    color: rgba(9, 30, 66, 0.54);
    display: flex;
    align-items: flex-start;

    &:first-child {
      flex-grow: 1;
    }
  }
`;

export const IconWrapper = styled.div`margin-right: 8px;`;

export const ListItem = ({ id, title, time, size, onClick }) => (
  <ListItemWrapper onClick={onClick}>
    <h3>{title}</h3>
    <ListExtraInfo>
      <div>
        <IconWrapper>
          <RecentIcon size="small" label="Updated at" />
        </IconWrapper>
        {time}
      </div>
      <div>
        <IconWrapper>
          <IssuesIcon size="small" label="Size" />
        </IconWrapper>
        {size}
      </div>
    </ListExtraInfo>
  </ListItemWrapper>
);

export default function DocumentList({ items, onAction }) {
  return (
    <ListScrollContainer>
      {items.map(item => (
        <ListItem
          key={item.id}
          title={item.title}
          time={item.time}
          size={item.size}
          onClick={() => onAction(switchToEdit(item.id))}
        />
      ))}
    </ListScrollContainer>
  );
}
