import React from "react";
import EditorContext from "@atlaskit/editor-core/dist/es5/editor/ui/EditorContext";
import WithEditorActions from "@atlaskit/editor-core/dist/es5/editor/ui/WithEditorActions";
import Editor from "../components/Editor";
import { updateRecentDoc } from "../actions";

const contentTransformer = doc => {
  return Promise.resolve({
    content: doc,
    time: Date.now(),
    textContent: doc.textContent,
    size: doc.textContent.length
  });
};

export default function Edit({ state, update }) {
  // const popupsMountPoint = document.querySelector("#hidden-popups-mount-point");
  return (
    <EditorContext>
      <WithEditorActions
        render={actions => (
          <Editor
            key={state.recentDocId}
            defaultValue={state.docs[state.recentDocId].content}
            placeholder="Write something..."
            contentTransformerProvider={() => ({ encode: contentTransformer })}
            onChange={() =>
              actions.getValue().then(value => update(updateRecentDoc(value)))}
          />
        )}
      />
    </EditorContext>
  );
}
