"use client";
import { useAppDispatch, useAppSelector } from "@/common/hook";
import ChooseSwitch from "@/components/choose-switch";
import {
  MessageFinishedForReal,
  MessageFinishedForTry,
} from "@/components/dialog";
import FormSpin from "@/components/form-spin";
import Wheel from "@/components/wheel";
import { EStatusSpin } from "@/enum/EStatusSpin";
import { ESwitch } from "@/enum/ESwitch";
import { ISegment } from "@/models/segment";
import { UPDATE_SWITCH } from "@/redux/slices/switchSlice";
import { CHANGE_STATUS_SPIN } from "@/redux/slices/userSpinSlice";
import { Box, Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useReducer } from "react";

interface IState {
  segment?: ISegment;
}

enum ETypeState {
  UPDATE_SEGMENT,
}

const reducer = (state: IState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case ETypeState.UPDATE_SEGMENT:
      state.segment = JSON.parse(JSON.stringify(payload));
      return { ...state };
    default:
      return { ...state };
  }
};

const QuayThuongPage = () => {
  const switchStatus = useAppSelector((state) => state.switch.status);
  const statusSpin = useAppSelector((state) => state.userSpin.statusSpin);
  const segments = useAppSelector((state) => state.segment.segments);
  const dispatchTookit = useAppDispatch();

  const [state, dispatch] = useReducer(reducer, {});

  const handleCancel = () => {
    dispatchTookit(UPDATE_SWITCH(ESwitch.TRY));
    dispatchTookit(CHANGE_STATUS_SPIN(EStatusSpin.NEW));
    dispatch({ type: ETypeState.UPDATE_SEGMENT, payload: {} });
  };

  const onFinished = (segment: ISegment) => {
    dispatch({ type: ETypeState.UPDATE_SEGMENT, payload: segment });
  };

  const onCancelDialog = () => {
    dispatchTookit(CHANGE_STATUS_SPIN(EStatusSpin.NEW));
  };

  const onSwitchToReal = () => {
    dispatchTookit(UPDATE_SWITCH(ESwitch.REAL));
    dispatchTookit(CHANGE_STATUS_SPIN(EStatusSpin.READY));
  };

  const onGoToShop = () => {
    window.open("https://fb.com", "_blank", "noreferrer");
    handleCancel();
  };

  return (
    <>
      <Container sx={{ flexGrow: 1 }}>
        <Box sx={{ flexGrow: 1, my: 4 }}>
          <Grid container spacing={2} columns={12}>
            <Grid
              md={6}
              xs={8}
              xsOffset={2}
              mdOffset={3}
              className={"flex justify-end"}
            >
              <ChooseSwitch
                txtTry="Quay thử"
                txtReal="Quay thật"
              ></ChooseSwitch>
            </Grid>
            <Grid md={6} xs={8} xsOffset={2} mdOffset={3} sx={{}}>
              <Wheel
                segments={segments}
                isOnlyOnce={true}
                isAccept={switchStatus === ESwitch.REAL}
                sxCanvas={{
                  width: "100%",
                }}
                onFinished={onFinished}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>

      <FormSpin
        isOpen={
          switchStatus === ESwitch.REAL && statusSpin === EStatusSpin.READY
        }
        handleClose={() => handleCancel()}
      ></FormSpin>

      <MessageFinishedForTry
        isOpen={statusSpin === EStatusSpin.DONE && switchStatus === ESwitch.TRY}
        onCancel={onCancelDialog}
        onSwitchToReal={onSwitchToReal}
        segment={state.segment}
      ></MessageFinishedForTry>
      <MessageFinishedForReal
        isOpen={
          statusSpin === EStatusSpin.DONE && switchStatus === ESwitch.REAL
        }
        onCancel={onCancelDialog}
        onGoToShop={onGoToShop}
        segment={state.segment}
      ></MessageFinishedForReal>
    </>
  );
};

export default QuayThuongPage;
