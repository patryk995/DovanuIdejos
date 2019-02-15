import { ADD_ANSWER } from "../actions/types";

const initialState = {
  answers: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_ANSWER:
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.key]: action.payload.value
        }
      };
    default:
      return state;
  }
}
