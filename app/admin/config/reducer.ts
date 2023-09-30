import { IConfig } from "@/models/config";

export enum ETypeState {
  CHANGE_DIALOG,
  CREATE_CONFIG,
  UPDATE_CONFIG,
}

interface IState {
  isOpen: boolean;
  config: IConfig;
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
    case ETypeState.CREATE_CONFIG:
      state.config = {};
      return { ...state };
    case ETypeState.UPDATE_CONFIG:
      state.config = payload;
      return { ...state };
    default:
      return { ...state };
  }
};
