import { ISegment } from "@/models/segment";
import { SegmentRepository } from "@/repository/SegmentRepository";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ISegmentState {
  segments: ISegment[];
}
const name = "segment";
const initialState: ISegmentState = {
  segments: [],
};

const segmentRepository = new SegmentRepository();

export const getSegments = createAsyncThunk(`${name}/getSegments`, async () => {
  const response = await segmentRepository.getSegmentsAsync();
  return response;
});

const segmentSlice = createSlice({
  name: name,
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getSegments.fulfilled, (state, action) => {
      state.segments = action.payload;
    });
    builder.addCase(getSegments.rejected, (state, action) => {
      state.segments = [];
    });
  },
});

export const {} = segmentSlice.actions;

export default segmentSlice.reducer;
