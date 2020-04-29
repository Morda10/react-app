import { SET_USER } from "../types";

const initialState = {
  user: null,
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};
