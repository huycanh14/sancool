import { ESwitch } from "@/enum/ESwitch";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ISwitchState {
  status: ESwitch;
}

const initialState: ISwitchState = {
  status: ESwitch.TRY,
};

const switchSlice = createSlice({
  name: "switch",
  initialState: initialState,
  reducers: {
    UPDATE_SWITCH(state, actions: PayloadAction<ESwitch>) {
      state.status = actions.payload;
    },
  },
});

export const { UPDATE_SWITCH } = switchSlice.actions;

export default switchSlice.reducer;
