import React from "react";
import ReactDOM from "react-dom";
import { distanceInWordsToNow } from "date-fns";
import DocumentsList from "../components/DocumentsList";
import { sliceStr } from "../utils";

export default class List extends React.Component {
  timeout = null;
  state = { deleting: null };

  onMouseDown = docId => {
    this.timeout = setTimeout(() => this.setState({ deleting: docId }), 500);
  };

  onClick = (docId, action) => {
    clearTimeout(this.timeout);
    if (this.state.deleting === docId) return;
    this.setState({ deleting: null }, () => action());
  };

  escHandler = e => {
    if (e.key === "Escape") {
      this.setState({ deleting: null });
    }
  };

  outsideClickHandler = e => {
    const domNode = ReactDOM.findDOMNode(this); // eslint-disable-line react/no-find-dom-node
    if (domNode === e.target || e.target.contains(domNode)) {
      this.setState({ deleting: null });
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.escHandler);
    document.addEventListener("click", this.outsideClickHandler);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.escHandler);
    document.removeEventListener("click", this.outsideClickHandler);
  }

  render() {
    const { deleting } = this.state;
    const { state: appState, update } = this.props;
    const items = Object.keys(appState.docs)
      .map(docId => {
        const doc = appState.docs[docId];
        const title = sliceStr(doc.title, 0, 25);
        return {
          id: docId,
          size: doc.size,
          timeRaw: doc.time,
          time: distanceInWordsToNow(new Date(doc.time), { addSuffix: true }),
          title: title || "Empty Document"
        };
      })
      .sort((a, b) => b.timeRaw - a.timeRaw);

    return (
      <DocumentsList
        items={items}
        deleting={deleting}
        onItemClick={this.onClick}
        onItemMouseDown={this.onMouseDown}
        onAction={action => update(action)}
      />
    );
  }
}
