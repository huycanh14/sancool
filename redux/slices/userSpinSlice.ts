import { EChannel } from "@/enum/EChannel";
import { EStatusSpin } from "@/enum/EStatusSpin";
import { IUserSpin } from "@/models/user-spin";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ISwitchState {
  userSpin: IUserSpin;
  statusSpin: EStatusSpin;
}

const initialState: ISwitchState = {
  userSpin: {},
  statusSpin: EStatusSpin.NEW,
};

const userSpinSlice = createSlice({
  name: "userSpin",
  initialState: initialState,
  reducers: {
    RESET_USER_SPIN(state) {
      state.userSpin = {};
    },

    SAVE_DATA_AFTER_SPIN(
      state,
      actions: PayloadAction<{ phone: string; channel: EChannel }>
    ) {
      state.userSpin.phone = actions.payload.phone;
      state.userSpin.channel = actions.payload.channel;
    },

    CHANGE_STATUS_SPIN(state, actions: PayloadAction<EStatusSpin>) {
      state.statusSpin = actions.payload;
    },
  },
});

export const { RESET_USER_SPIN, SAVE_DATA_AFTER_SPIN, CHANGE_STATUS_SPIN } =
  userSpinSlice.actions;

export default userSpinSlice.reducer;
