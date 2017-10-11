export const updateRecentDoc = value =>
  function updateRecentDoc(state) {
    const newState = Object.assign({}, state);
    newState.docs[state.recentDocId] = value;
    return newState;
  };
