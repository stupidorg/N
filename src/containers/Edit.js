import React from "react";
import Editor from "../components/Editor";
import { updateRecentDoc } from "../actions";

export default function Edit({ state, update }) {
  return (
    <Editor
      key={state.recentDocId}
      defaultValue={state.docs[state.recentDocId]}
      onChange={value => update(updateRecentDoc(value))}
    />
  );
}
