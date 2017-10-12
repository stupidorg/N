import React from "react";
import { distanceInWordsToNow } from "date-fns";
import DocumentsList from "../components/DocumentsList";
import { sliceStr } from "../utils";

export default function List({ state, update }) {
  const items = Object.keys(state.docs)
    .map(docId => {
      const doc = state.docs[docId];
      const title = sliceStr(doc.textContent, 0, 15);
      return {
        id: docId,
        size: doc.size,
        timeRaw: doc.time,
        time: distanceInWordsToNow(new Date(doc.time), {
          addSuffix: true
        }),
        title: title || "Empty Document"
      };
    })
    .sort((a, b) => b.timeRaw - a.timeRaw);

  return <DocumentsList items={items} onAction={action => update(action)} />;
}
