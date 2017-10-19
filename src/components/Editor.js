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
  padding-bottom: 8px;
  box-sizing: border-box;

  & > div {
    flex: 1;
    padding: 8px 28px 0;

    & > div {
      height: 100%;

      /* Hide portal */
      & > div:first-child {
        display: none;
      }
    }
  }

  .ProseMirror {
    height: 100%;
    -webkit-app-region: no-drag;

    table {
      width: 100%;
    }

    & pre {
      font-family: "SFMono-Medium", "SF Mono", "Segoe UI Mono", "Roboto Mono",
        "Ubuntu Mono", Menlo, Courier, monospace;
      background: #f4f5f7;
      padding: 12px;
      border-radius: 3px;
    }

    & .code,
    & code {
      padding: 2px 4px;
      border-radius: 3px;
      background: #f4f5f7;
      font-size: 12px;
      line-height: 1.4;
    }
  }
`;

const contentTransformer = doc =>
  Promise.resolve({
    content: doc.toJSON(),
    time: Date.now(),
    textContent: doc.textContent,
    size: doc.textContent.length
  });

export default function Editor({ defaultValue, onChange }) {
  return (
    <EditorContext>
      <EditorWrapper>
        <WithEditorActions
          render={actions => (
            <FabricEditor
              appearance="chromeless"
              allowHyperlinks={true}
              allowLists={true}
              allowTasksAndDecisions={true}
              allowTextFormatting={true}
              allowTables={true}
              shouldFocus={true}
              placeholder="Write some text..."
              onChange={({ state: { doc } }) =>
                contentTransformer(doc).then(onChange)}
              defaultValue={defaultValue.content}
            />
          )}
        />
      </EditorWrapper>
    </EditorContext>
  );
}
