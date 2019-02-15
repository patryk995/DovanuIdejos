import { combineReducers } from "redux";
import giftReducer from "./giftReducer";
import answerReducer from "./answerReducer";

export default combineReducers({
  gift: giftReducer,
  answer: answerReducer
});
