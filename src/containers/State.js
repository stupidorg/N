import React from "react";
import PropTypes from "prop-types";
const Store = require("electron-store");
const store = new Store();

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

export class StateProvider extends React.Component {
  static childContextTypes = {
    state: PropTypes.object,
    update: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      state: store.get("state") || this.getDefaultState()
    };
  }

  getDefaultState() {
    const docId = uuidv4();
    return {
      recentDocId: docId,
      docs: {
        [docId]: {}
      }
    };
  }

  update = updater => {
    const state = updater(this.state.state);
    store.set("state", state);
    const consoleGroup = `State updated by: ${updater.name}`;
    console.groupCollapsed(consoleGroup);
    console.log("Updated: ", updater.name);
    console.log("Old State: ", this.state.state);
    console.log("New State: ", state);
    console.groupEnd(consoleGroup);
    this.setState({ state });
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
