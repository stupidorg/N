import React from "react";
import styled from "styled-components";
import { StateProvider, WithState } from "./State";
import Editor from "../components/Editor";
import TitleBar from "../components/TitleBar";
import { updateRecentDoc } from "../actions";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

module.exports = function App() {
  return (
    <StateProvider>
      <Container>
        <WithState
          render={(state, update) => (
            <TitleBar onAction={action => update(action)} />
          )}
        />
        <WithState
          render={(state, update) => (
            <Editor
              key={state.recentDocId}
              defaultValue={state.docs[state.recentDocId]}
              onChange={value => update(updateRecentDoc(value))}
            />
          )}
        />
      </Container>
    </StateProvider>
  );
};
