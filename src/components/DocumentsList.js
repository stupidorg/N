import React from "react";
import styled from "styled-components";
import RecentIcon from "@atlaskit/icon/glyph/recent";
import IssuesIcon from "@atlaskit/icon/glyph/issues";
import TrashIcon from "@atlaskit/icon/glyph/trash";
import { switchToEdit, deleteDoc } from "../actions";

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
  position: relative;

  &:hover {
    background: rgba(234, 230, 255, 0.6);
    cursor: pointer;
  }

  .list-item-delete-overlay {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #ff5630;
    color: #fff;
    font-size: 120%;

    &:hover {
      background: #ff7452;
    }

    &.-visible {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    span {
      margin-top: -3px;
      margin-right: 6px;
    }
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

export function ListItem({
  id,
  title,
  time,
  size,
  isDeleting,
  onClick,
  onMouseDown,
  onDelete
}) {
  return (
    <ListItemWrapper onClick={onClick} onMouseDown={onMouseDown}>
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
      <div
        className={"list-item-delete-overlay" + (isDeleting ? " -visible" : "")}
        onClick={onDelete}
      >
        <TrashIcon
          label="Delete document"
          primaryColor="#fff"
          size="medium"
        />{" "}
        Delete?
      </div>
    </ListItemWrapper>
  );
}

export default function DocumentList({
  items,
  deleting,
  onAction,
  onItemMouseDown,
  onItemClick
}) {
  return (
    <ListScrollContainer>
      {items.map(item => (
        <ListItem
          key={item.id}
          isDeleting={item.id === deleting}
          title={item.title}
          time={item.time}
          size={item.size}
          onMouseDown={() => onItemMouseDown(item.id)}
          onDelete={() => onAction(deleteDoc(item.id))}
          onClick={() =>
            onItemClick(item.id, () => onAction(switchToEdit(item.id)))}
        />
      ))}
    </ListScrollContainer>
  );
}
