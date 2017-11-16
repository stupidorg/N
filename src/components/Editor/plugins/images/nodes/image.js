export default {
  group: "block",
  attrs: {
    src: { default: "" },
    alt: { default: null },
    title: { default: null }
  },
  draggable: true,
  parseDOM: [
    {
      tag: "img[src]",
      getAttrs(dom) {
        return {
          src: dom.getAttribute("src"),
          alt: dom.getAttribute("alt"),
          title: dom.getAttribute("title")
        };
      }
    }
  ],
  toDOM(node) {
    return ["img", node.attrs];
  }
};
