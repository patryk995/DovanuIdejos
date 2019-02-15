import {
  GET_GIFTS,
  DELETE_GIFT,
  ADD_GIFT,
  GIFTS_LOADING
} from "../actions/types";
const initialState = {
  gifts: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_GIFTS:
      return {
        ...state,
        gifts: action.payload,
        loading: false
      };
    case ADD_GIFT:
      return {
        ...state,
        gifts: [action.payload, ...state.gifts]
      };
    case DELETE_GIFT:
      return {
        ...state,
        gifts: state.gifts.filter(item => item._id !== action.payload)
      };
    case GIFTS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
