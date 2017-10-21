import React from "react";
import Editor from "../components/Editor";
import { updateRecentDoc } from "../actions";

export default function Edit({ state, update }) {
  const popupsMountPoint = document.querySelector("#hidden-popups-mount-point");
  return (
    <Editor
      key={state.recentDocId}
      popupsMountPoint={popupsMountPoint}
      defaultValue={state.docs[state.recentDocId]}
      onChange={value => update(updateRecentDoc(value))}
    />
  );
}
