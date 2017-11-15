import { EditorState, NodeSelection, Plugin, PluginKey } from "prosemirror-state";
import insertImageCommand from "../commands/insert-image";

function isDroppedFile(e) {
  return Array.prototype.slice.call(e.dataTransfer.types).indexOf("Files") !== -1;
}

function isPastedFile(e) {
  const types = e.clipboardData && e.clipboardData.types;
  return types && Array.prototype.slice.call(types).indexOf("Files") !== -1;
}

function processFile(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = fileData => resolve(fileData.target.result);
    reader.readAsDataURL(file);
  });
}

export default () =>
  new Plugin({
    props: {
      handleDOMEvents: {
        drop(view, event) {
          if (!isDroppedFile(event)) return false;
          event.preventDefault();

          Promise.all(Array.from(event.dataTransfer.files).map(processFile)).then(files => {
            files.forEach(src => {
              view.dispatch(insertImageCommand(src)(view.state));
            });
          });

          return true;
        },

        paste(view, event) {
          if (!isPastedFile(event)) return false;
          event.preventDefault();

          Promise.all(Array.from(event.clipboardData.files).map(processFile)).then(files => {
            files.forEach(src => {
              view.dispatch(insertImageCommand(src)(view.state));
            });
          });

          return true;
        }
      }
    }
  });
