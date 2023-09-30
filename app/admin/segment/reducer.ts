import { ISegment } from "@/models/segment";

export enum ETypeState {
  CHANGE_DIALOG,
  CREATE_SEGMENT,
  UPDATE_SEGMENT,
}

interface IState {
  isOpen: boolean;
  segment: ISegment;
}

export const reducer = (
  state: IState,
  action: { type: ETypeState; payload: any }
) => {
  const { type, payload } = action;
  switch (type) {
    case ETypeState.CHANGE_DIALOG:
      state.isOpen = payload;
      return { ...state };
    case ETypeState.CREATE_SEGMENT:
      state.segment = { color: "#ffffff" };
      return { ...state };
    case ETypeState.UPDATE_SEGMENT:
      state.segment = payload;
      return { ...state };
    default:
      return { ...state };
  }
};
