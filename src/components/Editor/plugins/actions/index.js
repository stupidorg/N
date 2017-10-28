import tasksAndDecisionsPlugin from "@atlaskit/editor-core/dist/es5/editor/plugins/tasks-and-decisions";

const actionsPlugin = {
  nodes() {
    return tasksAndDecisionsPlugin
      .nodes()
      .filter(node => !node.name.startsWith("decision"));
  },
  pmPlugins() {
    return tasksAndDecisionsPlugin.pmPlugins();
  }
};
export default actionsPlugin;
