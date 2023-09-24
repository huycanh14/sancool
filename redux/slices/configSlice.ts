import { IConfig } from "@/models/config";
import { ConfigRepository } from "@/repository/ConfigRepository";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IConfigState {
  configs: IConfig[];
}
const name = "config";
const initialState: IConfigState = {
  configs: [],
};

const configRepository = new ConfigRepository();

export const getConfigs = createAsyncThunk(`${name}/getConfigs`, async () => {
  const response = await configRepository.gets();
  return response;
});

const configSlice = createSlice({
  name: name,
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getConfigs.fulfilled, (state, action) => {
      state.configs = action.payload;
    });
    builder.addCase(getConfigs.rejected, (state, action) => {
      state.configs = [];
    });
  },
});

export const {} = configSlice.actions;

export default configSlice.reducer;
