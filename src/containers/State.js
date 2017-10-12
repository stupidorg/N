import React from "react";
import PropTypes from "prop-types";
import Store from "electron-store";
import { uuidv4, createEmptyDocument } from "../utils";

const store = new Store();

export class StateProvider extends React.Component {
  static childContextTypes = {
    state: PropTypes.object,
    update: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      state: store.get("state") || this.getDefaultState()
      // state: this.getDefaultState()
    };
  }

  getDefaultState() {
    const docId = uuidv4();
    return {
      route: "edit",
      recentDocId: docId,
      docs: { [docId]: createEmptyDocument() }
    };
  }

  update = updater => {
    const state = updater(this.state.state);
    const consoleGroup =
      state === this.state.state
        ? `State updated skiped: ${updater.name}`
        : `State updated by: ${updater.name}`;

    console.groupCollapsed(consoleGroup);
    console.log("Updater: ", updater.name);
    console.log("Old State: ", this.state.state);
    console.log("New State: ", state);
    console.groupEnd(consoleGroup);

    if (state !== this.state.state) {
      store.set("state", state);
      this.setState({ state });
    }
  };

  getChildContext() {
    return {
      state: this.state.state,
      update: this.update
    };
  }

  render() {
    return this.props.children;
  }
}

export class WithState extends React.Component {
  static contextTypes = {
    state: PropTypes.object,
    update: PropTypes.func
  };

  render() {
    return this.props.render(this.context.state, this.context.update);
  }
}
