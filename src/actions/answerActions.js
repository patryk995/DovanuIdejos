import { ADD_ANSWER } from "./types";

export const addAnswer = (key, value) => {
  return {
    type: ADD_ANSWER,
    payload: {
      key: key,
      value: value
    }
  };
};
