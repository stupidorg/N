import React from "react";
import styled from "styled-components";
import EditorContext from "@atlaskit/editor-core/dist/es5/editor/ui/EditorContext";
import WithEditorActions from "@atlaskit/editor-core/dist/es5/editor/ui/WithEditorActions";
import { StateProvider, WithState } from "./State";
import TitleBar from "../components/TitleBar";
import Edit from "./Edit";
import List from "./List";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

module.exports = function App() {
  return (
    <StateProvider>
      <EditorContext>
        <Container>
          <WithState
            render={(state, update) => (
              <WithEditorActions
                render={editorActions => (
                  <TitleBar
                    editorActions={editorActions}
                    onAction={action => update(action)}
                  />
                )}
              />
            )}
          />
          <WithState
            render={(state, update) => {
              switch (state.route) {
                case "edit":
                  return <Edit state={state} update={update} />;
                  break;

                case "list":
                  return <List state={state} update={update} />;
                  break;

                default:
                  return <div>💩</div>;
              }
            }}
          />
        </Container>
      </EditorContext>
    </StateProvider>
  );
};
