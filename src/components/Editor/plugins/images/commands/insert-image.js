export default function insertImageCommand(src) {
  return state =>
    state.tr.insert(state.selection.$from.pos, state.schema.nodes.image.create({ src }));
}
