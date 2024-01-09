import { EChannel } from "@/enum/EChannel";
import { EStatusSpin } from "@/enum/EStatusSpin";
import { IUserSpin } from "@/models/user-spin";
import { UserSpinRepository } from "@/repository/UserSpinRepository";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IUserSpinState {
  userSpin: IUserSpin;
  userSpins: IUserSpin[];
  statusSpin: EStatusSpin;
}

const initialState: IUserSpinState = {
  userSpin: {},
  userSpins: [],
  statusSpin: EStatusSpin.NEW,
};
const name = "userSpin";

const userSpinRepository = new UserSpinRepository();
export const createUserSpin = createAsyncThunk(
  `${name}/createUserSpin`,
  async (limit: number, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const userSpin = state.userSpin.userSpin;
    // const cnt = await userSpinRepository.findCountSpin(userSpin);
    // if (cnt < limit) {
    //   return await userSpinRepository.create(userSpin);
    // }
    // return "false";
    return await userSpinRepository.create(userSpin);
  }
);

export const getUserSpins = createAsyncThunk(
  `${name}/getUserSpins`,
  async () => {
    return await userSpinRepository.getsAsync();
  }
);

export const deleteUserSpins = createAsyncThunk(
  `${name}/deletUserSpins`,
  async (payload: string[], { dispatch }) => {
    const res = await userSpinRepository.deleteMultipleAsync(payload);
    if (res) {
      dispatch(getUserSpins());
    }
    return res;
  }
);

const userSpinSlice = createSlice({
  name: name,
  initialState: initialState,
  reducers: {
    RESET_USER_SPIN(state) {
      state.userSpin = {};
    },

    SAVE_DATA_BEFORE_SPIN(
      state,
      actions: PayloadAction<{ phone: string; channel: EChannel }>
    ) {
      state.userSpin.phone = actions.payload.phone;
      state.userSpin.channel = actions.payload.channel;
    },

    SAVE_DATA_AFTER_SPIN(
      state,
      actions: PayloadAction<{
        segment: string;
        createdAt: string;
        expiredAt: string;
      }>
    ) {
      state.userSpin = JSON.parse(
        JSON.stringify({
          ...state.userSpin,
          segment: actions.payload.segment,
          createdAt: actions.payload.createdAt,
          expiredAt: actions.payload.expiredAt,
        })
      );
    },

    CHANGE_STATUS_SPIN(state, actions: PayloadAction<EStatusSpin>) {
      state.statusSpin = actions.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(createUserSpin.fulfilled, (state, action) => {
      // state.configs = action.payload;
    });
    builder.addCase(createUserSpin.rejected, (state, action) => {
      // state.configs = [];
    });
    builder.addCase(getUserSpins.fulfilled, (state, action) => {
      state.userSpins = action.payload;
    });
    builder.addCase(getUserSpins.rejected, (state, action) => {
      state.userSpins = [];
    });
    builder.addCase(deleteUserSpins.fulfilled, (state, action) => {
      getUserSpins();
    });
    builder.addCase(deleteUserSpins.rejected, (state, action) => {
      // state.userSpins = [];
    });
  },
});

export const {
  RESET_USER_SPIN,
  SAVE_DATA_BEFORE_SPIN,
  CHANGE_STATUS_SPIN,
  SAVE_DATA_AFTER_SPIN,
} = userSpinSlice.actions;

export default userSpinSlice.reducer;
