import { ISegment } from "@/models/segment";
import { createSlice } from "@reduxjs/toolkit";

interface ISegmentState {
  segments: ISegment[];
}

const initialState: ISegmentState = {
  segments: [
    {
      id: "1",
      text: "I phone 13 pro max",
      color: "#EE4040",
      occurrence: 2,
    },
    { id: "2", text: "Bose surround speakers", color: "#F0CF50" },
    {
      id: "3",
      text: "Samsung 65-Inch Crystal UHD 4K Flat Smart TV",
      color: "#815CD1",
    },
    {
      id: "4",
      text: "MacBook Air MGN63 14” Display, Apple M1 Chip With 8-Core",
      color: "#3DA5E0",
    },
    {
      id: "4",
      text: "KIA TELLURIDE 2022",
      color: "#34A24F",
    },
  ],
};

const segmentSlice = createSlice({
  name: "segment",
  initialState: initialState,
  reducers: {},
});

export const {} = segmentSlice.actions;

export default segmentSlice.reducer;
