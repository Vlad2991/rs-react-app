import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedItem {
  name: string;
  description: string;
  url: string;
}

interface SelectedItemsState {
  items: SelectedItem[];
}

const initialState: SelectedItemsState = {
  items: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<SelectedItem>) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.name !== action.payload);
    },
    clearItems: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearItems } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;