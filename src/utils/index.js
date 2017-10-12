export function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

export function createEmptyDocument() {
  return {
    time: Date.now(),
    size: 0,
    textContent: "",
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: []
        }
      ]
    }
  };
}

export function sliceStr(str, from, to) {
  if (str.length <= from) return "";
  if (str.length < to) return str.slice(from, to);
  if (to) {
    const newTo = Math.min(Math.max(str.indexOf(" ", to), to), str.length);
    return str.slice(from, newTo) + (str.length > newTo ? "..." : "");
  }
  return str.slice(from);
}
