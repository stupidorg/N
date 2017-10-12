import { uuidv4, createEmptyDocument } from "../utils";

export function cloneState(state) {
  const newState = Object.assign({}, state);
  newState.docs = Object.assign({}, state.docs);
  return newState;
}

export const updateRecentDoc = value =>
  function updateRecentDoc(state) {
    const newState = cloneState(state);
    newState.docs[state.recentDocId] = value;
    return newState;
  };

export const createNewDoc = () =>
  function createNewDoc(state) {
    const newState = cloneState(state);
    const docId = uuidv4();
    newState.docs[docId] = createEmptyDocument();
    newState.recentDocId = docId;
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
