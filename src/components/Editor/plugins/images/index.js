import image from "./nodes/image";
import dragAndDropPlugin from "./pm-plugins/drag-n-drop";

const imagesPlugin = {
  nodes() {
    return [{ name: "image", rank: 200, node: image }];
  },

  pmPlugins() {
    return [{ rank: 200, plugin: dragAndDropPlugin }];
  }
};

export default imagesPlugin;
