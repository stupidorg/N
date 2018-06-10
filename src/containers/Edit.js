import React from "react";
import { EditorContext, WithEditorActions } from "@atlaskit/editor-core";
import Editor from "../components/Editor";
import { updateRecentDoc } from "../actions";

const contentTransformer = doc => {
  const title = doc.content.content[0] ? doc.content.content[0].textContent : "";
  return Promise.resolve({
    title,
    content: doc.toJSON(),
    time: Date.now(),
    textContent: doc.textContent,
    size: doc.textContent.length
  });
};

export default function Edit({ state, update }) {
  return (
    <WithEditorActions
      render={actions => (
        <Editor
          key={state.recentDocId}
          defaultValue={state.docs[state.recentDocId].content}
          selection={state.docs[state.recentDocId].selection}
          placeholder="Write something..."
          contentTransformerProvider={() => ({ encode: contentTransformer })}
          onChange={() => actions.getValue().then(value => update(updateRecentDoc(value)))}
        />
      )}
    />
  );
}
