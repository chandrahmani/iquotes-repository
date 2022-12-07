export const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_ME":
      return { me: action.payload?.me };
    default:
      return new Error();
  }
};
