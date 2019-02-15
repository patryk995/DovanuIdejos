import { GET_GIFTS, DELETE_GIFT, ADD_GIFT, GIFTS_LOADING } from "./types";
import axios from "axios";

// export const getGifts = () => dispatch => {
//   dispatch(setGiftsLoading());
//   axios.get("/wp-json/wp/v2/gifts").then(res =>
//     dispatch({
//       type: GET_GIFTS,
//       payload: res.data
//     })
//   );
// };
export const getFilteredGifts = answers => dispatch => {
  dispatch(setGiftsLoading());
  const gender = answers.answers.gender;
  const age = answers.answers.age;

  // let tempPrice = answers.answers.price;
  let tempPrice = "0,50";
  const [minprice, maxprice] = tempPrice.split(",");
  console.log(tempPrice);
  console.log(typeof tempPrice);

  // const [minprice, maxprice] = [0, 20];
  axios
    .get(`/wp-json/wp/v2/gifts/filter/${gender}/${age}/${minprice}/${maxprice}`)
    .then(res =>
      dispatch({
        type: GET_GIFTS,
        payload: res.data
      })
    );
};
export const addItem = gift => dispatch => {
  axios.post("/api/gifts", gift).then(res =>
    dispatch({
      type: ADD_GIFT,
      payload: res.data
    })
  );
};
export const deleteGift = id => dispatch => {
  axios.delete(`/wp-json/wp/v2/gifts/${id}`).then(res =>
    dispatch({
      type: DELETE_GIFT,
      payload: id
    })
  );
};
export const setGiftsLoading = () => {
  return {
    type: GIFTS_LOADING
  };
};
