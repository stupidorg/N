// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const React = require("react");
const ReactDOM = require("react-dom");
const App = require("./dist/containers/App");

ReactDOM.render(React.createElement(App), document.getElementById("app"));
