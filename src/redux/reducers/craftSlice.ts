import { createSlice, current } from "@reduxjs/toolkit";
import { RaidBoss } from "../../types/craft.types";

interface CraftSlice {
  data: Array<RaidBoss>;
}

const initialState: CraftSlice = {
  data: [],
};

const craftSlice = createSlice({
  name: "craft",
  initialState,
  reducers: {
    addCraftItem(state, action) {
      const { el, count } = action.payload;
      const newItem = { ...el, count: count || 1 };
      // RE-CHECK
      const isMatched = state.data.filter(
        (i) => i.value === action.payload.value
      );

      if (isMatched.length > 0) {
        // FILTER AND UPDATE LIST
        console.log("1", isMatched);
      } else if (current(state).data.length === 0) {
        state.data = [newItem];
        console.log("2", current(state));
      } else {
        state.data = [...state.data, newItem];
        console.log("3", current(state));
      }
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
