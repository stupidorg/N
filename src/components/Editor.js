const React = require("react");
const styled = require("styled-components").default;
const FabricEditor = require("@atlaskit/editor-core").Editor;
const { EditorContext, WithEditorActions } = require("@atlaskit/editor-core");

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
              placeholder="Write some text..."
              onChange={() => actions.getValue().then(onChange)}
              defaultValue={defaultValue}
            />
          )}
        />
      </EditorWrapper>
    </EditorContext>
  );
}
