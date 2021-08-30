import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  channelId: null,
  status: "idle",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    openChannel: (state, action) => {
      state.channelId = action.payload.channelId;
    },
  },
});

export const { openChannel } = appSlice.actions;

// The function below is called a selector and allows us to select a channelId from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.app.channelId)`
export const selectChannel = (state) => state.app.channelId;

export default appSlice.reducer;
