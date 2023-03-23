import { createSlice, current } from "@reduxjs/toolkit";

const craftSlice = createSlice({
  name: "craft",
  initialState: {
    data: [],
  },
  reducers: {
    addCraftItem(state, action) {
      console.log("action.payload ===>", action.payload);
      const { el, count } = action.payload;

      // RE-CHECK
      const isMatched = state.data.filter(
        (i) => i.value === action.payload.value
      );

      console.log("el", el, "length === ", isMatched.length);
      if (isMatched.length > 0) {
        // FILTER AND UPDATE LIST
        console.log("0", state.data);
      } else if (current(state).data === 0) {
        state.data = [el];

        console.log(
          "----------",

          current(state).data
        );

        console.log("2", state.data);
      } else {
        state.data = [...state.data, current(state).data];
        console.log("3", state.data);
      }
      // state.data[index] = {
      //   ...el,
      //   count: count || 1,
      // };
      // console.log("index ===>", index);
      // console.log("STORE DATA ===>", current(state).data);
    },
    updateCraftItem(state, action) {
      console.log("action.payload ===>", action);
    },
  },
});

export const { addCraftItem, updateCraftItem } = craftSlice.actions;

export default craftSlice.reducer;

// updateCraftEl(state, action) {
//   const matchingEl = state.craftList.find((el) => {
//     console.log(action.payload);
//     return el.value === action.payload;
//   });

//   console.log(matchingEl);
// },
