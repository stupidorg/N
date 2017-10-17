import { uuidv4, createEmptyDocument, isEmptyDoc } from "../utils";

export function cloneState(state) {
  const newState = Object.assign({}, state);
  newState.docs = Object.assign({}, state.docs);
  return newState;
}

export const deleteDoc = docId =>
  function deleteDoc(state) {
    const newState = cloneState(state);
    newState.docs = Object.keys(newState.docs).reduce((docs, key) => {
      if (key === docId) return docs;
      docs[key] = newState.docs[key];
      return docs;
    }, {});

    if (Object.keys(newState.docs).length) {
      return newState;
    }

    const newStateWithDoc = createNewDoc()(newState);
    const newDocId = Object.keys(newStateWithDoc.docs)[0];
    return switchToEdit(newDocId)(newStateWithDoc);
  };

export const updateRecentDoc = value =>
  function updateRecentDoc(state) {
    const newState = cloneState(state);
    newState.docs[state.recentDocId] = value;
    return newState;
  };

export const createNewDoc = () =>
  function createNewDoc(state) {
    const newState = cloneState(state);
    const emptyDocId = Object.keys(state.docs).find(docId =>
      isEmptyDoc(state.docs[docId])
    );

    if (emptyDocId) {
      newState.recentDocId = emptyDocId;
    } else {
      const docId = uuidv4();
      newState.docs[docId] = createEmptyDocument();
      newState.recentDocId = docId;
    }

    newState.route = "edit";
    return newState;
  };

export const switchTo = route =>
  function switchTo(state) {
    const newState = cloneState(state);
    newState.route = route;
    return newState;
  };

export const switchToList = () => switchTo("list");

export const switchToEdit = docId =>
  function switchToEdit(state) {
    const newState = switchTo("edit")(state);
    newState.recentDocId = docId;
    return newState;
  };
