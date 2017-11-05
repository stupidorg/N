// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const electron = require('electron');
const React = require('react');
const ReactDOM = require('react-dom');
const App = require('./dist/containers/App');

ReactDOM.render(React.createElement(App), document.getElementById('app'));

console.log(`Renderer JavaScript Startup Time: ${performance.now() - global.startTime}ms`);

// Allow opening links in browser with CMD+CLICK
(() => {
  document.addEventListener('click', e => {
    const elem = e.target.tagName === 'A' ? e.target : e.target.parentElement;
    if (elem.tagName === 'A') {
      const url = elem.getAttribute('href');
      if (url && e.metaKey) {
        electron.shell.openExternal(url);
        e.preventDefault();
      }
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Meta') {
      document.body.classList.add('links');
    }
  });

  document.addEventListener('keyup', e => {
    if (e.key === 'Meta') {
      document.body.classList.remove('links');
    }
  });
})();
