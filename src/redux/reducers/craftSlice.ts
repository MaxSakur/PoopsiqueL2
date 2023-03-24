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
      if (current(state).data.length === 0) {
        state.data = [newItem];
      } else {
        state.data = [...state.data, newItem];
      }
    },
    updateCraftItem(state, action) {
      const { el, count, index } = action.payload;
      state.data[index] = { ...el, count };
    },
  },
});

export const { addCraftItem, updateCraftItem } = craftSlice.actions;

export default craftSlice.reducer;
