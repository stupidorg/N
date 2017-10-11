import { uuidv4 } from "../utils";

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
    newState.docs[docId] = "";
    newState.recentDocId = docId;
    return newState;
  };
