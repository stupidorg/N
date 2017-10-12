import React from "react";
import styled from "styled-components";
import {
  Editor as FabricEditor,
  EditorContext,
  WithEditorActions
} from "@atlaskit/editor-core";

const EditorWrapper = styled.div`
  flex-grow: 1;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;

  & > div {
    height: 100%;
    padding: 0 28px;

    & > div {
      height: 100%;
    }
  }

  .ProseMirror {
    height: 100%;
    -webkit-app-region: no-drag;
  }
`;

const contentTransformerProvider = () => ({
  encode(doc) {
    return {
      content: doc.toJSON(),
      time: Date.now(),
      textContent: doc.textContent,
      size: doc.textContent.length
    };
  }
});

export default function Editor({ defaultValue, onChange }) {
  return (
    <EditorContext>
      <EditorWrapper>
        <WithEditorActions
          render={actions => (
            <FabricEditor
              appearance="chromeless"
              allowLists={true}
              allowTasksAndDecisions={true}
              allowTextFormatting={true}
              shouldFocus={true}
              contentTransformerProvider={contentTransformerProvider}
              placeholder="Write some text..."
              onChange={() => actions.getValue().then(onChange)}
              defaultValue={defaultValue.content}
            />
          )}
        />
      </EditorWrapper>
    </EditorContext>
  );
}
