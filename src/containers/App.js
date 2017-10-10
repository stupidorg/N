const React = require("react");
const Store = require("electron-store");
const styled = require("styled-components").default;
const Editor = require("../components/Editor");
const TitleBar = require("../components/TitleBar");

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

const store = new Store();
const docId = store.get("recentDocId") || uuidv4();
const doc = store.get("doc." + docId) || {};
store.set("recentDocId", docId);
store.set("doc." + docId, doc);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

module.exports = function App() {
  return (
    <Container>
      <TitleBar />
      <Editor
        defaultValue={doc}
        onChange={value => store.set("doc." + docId, value)}
      />
    </Container>
  );
};
