export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify({
      user: state.user
    });
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.error('Error saving state:', err);
  }
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading state:', err);
    return undefined;
  }
};
