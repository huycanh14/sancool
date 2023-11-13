"use client";
import { useAppDispatch, useAppSelector } from "@/common/hook";
import ChooseSwitch from "@/components/choose-switch";
import {
  MessageFinishedForReal,
  MessageFinishedForTry,
  MessageForRule,
} from "@/components/dialog";
import FormSpin from "@/components/form-spin";
import Wheel from "@/components/wheel";
import { EStatusSpin } from "@/enum/EStatusSpin";
import { ESwitch } from "@/enum/ESwitch";
import { ISegment } from "@/models/segment";
import { getSegments } from "@/redux/slices/segmentSlice";
import { UPDATE_SWITCH } from "@/redux/slices/switchSlice";
import {
  CHANGE_STATUS_SPIN,
  SAVE_DATA_AFTER_SPIN,
  createUserSpin,
} from "@/redux/slices/userSpinSlice";
import { Box, Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useReducer } from "react";
import { getConfigs } from "@/redux/slices/configSlice";
import { FooterClient } from "@/components/footer";
import { EChannel } from "@/enum/EChannel";

interface IState {
  segment?: ISegment;
  showRule?: boolean;
}

enum ETypeState {
  UPDATE_SEGMENT,
  UPDATE_SHOW_RULE,
}

const reducer = (state: IState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case ETypeState.UPDATE_SEGMENT:
      state.segment = JSON.parse(JSON.stringify(payload));
      return { ...state };
    case ETypeState.UPDATE_SHOW_RULE:
      state.showRule = payload;
    default:
      return { ...state };
  }
};

const QuayThuongPage = () => {
  const switchStatus = useAppSelector((state) => state.switch.status);
  const statusSpin = useAppSelector((state) => state.userSpin.statusSpin);
  const userSpin = useAppSelector((state) => state.userSpin.userSpin);
  const segments = useAppSelector((state) => state.segment.segments);
  const configs = useAppSelector((state) => state.config.configs);
  const dispatchTookit = useAppDispatch();

  const [state, dispatch] = useReducer(reducer, {});

  const handleCancel = () => {
    dispatchTookit(UPDATE_SWITCH(ESwitch.TRY));
    dispatchTookit(CHANGE_STATUS_SPIN(EStatusSpin.NEW));
    dispatch({ type: ETypeState.UPDATE_SEGMENT, payload: {} });
  };

  const onFinished = async (segment: ISegment) => {
    dispatch({ type: ETypeState.UPDATE_SEGMENT, payload: segment });
    if (switchStatus === ESwitch.REAL) {
      const today = new Date();
      await dispatchTookit(
        SAVE_DATA_AFTER_SPIN({
          segment: segment.text || "",
          createdAt: new Date() + "",
          expiredAt:
            new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate() +
                (configs.length > 0 ? (configs[0].express ?? 30) * 1 : 30)
            ) + "",
        })
      );
      await dispatchTookit(
        createUserSpin(configs.length > 0 ? (configs[0].limit || 1) * 1 : 1)
      );
    }
  };

  const onCancelDialog = () => {
    dispatchTookit(CHANGE_STATUS_SPIN(EStatusSpin.NEW));
  };

  const onSwitchToReal = () => {
    dispatchTookit(UPDATE_SWITCH(ESwitch.REAL));
    dispatchTookit(CHANGE_STATUS_SPIN(EStatusSpin.READY));
  };

  const onGoToShop = () => {
    if (userSpin.channel === EChannel.SHOPEE) {
      window.open(
        configs.length > 0
          ? configs[0].linkChatShopee || "https://shopee.vn/"
          : "https://shopee.vn/",
        "_blank",
        "noreferrer"
      );
    } else if (userSpin.channel === EChannel.TIKTOK) {
      window.open(
        configs.length > 0
          ? configs[0].linkChatTiktok || "https://www.tiktok.com/vi-VN/"
          : "https://www.tiktok.com/vi-VN/",
        "_blank",
        "noreferrer"
      );
    } else {
      window.open("https://fb.com", "_blank", "noreferrer");
    }
    handleCancel();
  };

  useEffect(() => {
    dispatch({ type: ETypeState.UPDATE_SHOW_RULE, payload: true });
    if (configs.length === 0) {
      dispatchTookit(getConfigs());
    }
    dispatchTookit(getSegments());
  }, []);

  return (
    <>
      <Container sx={{ flexGrow: 1 }}>
        <Box sx={{ flexGrow: 1, my: 4 }}>
          <Grid container spacing={2} columns={12} className={"items-center"}>
            <Grid xs={12} md={8}>
              <Grid container spacing={2} columns={12}>
                <Grid
                  md={8}
                  xs={8}
                  xsOffset={2}
                  mdOffset={2}
                  className={"flex justify-end"}
                >
                  <ChooseSwitch
                    txtTry="Quay thử"
                    txtReal="Quay thật"
                  ></ChooseSwitch>
                </Grid>
                <Grid md={8} xs={8} xsOffset={2} mdOffset={2} sx={{}}>
                  {segments.length > 0 && (
                    <Wheel
                      segments={segments}
                      isOnlyOnce={true}
                      isAccept={switchStatus === ESwitch.REAL}
                      sxCanvas={{
                        width: "100%",
                      }}
                      onFinished={onFinished}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>{" "}
            {!state.showRule && configs.length > 0 && (
              <Grid xs={12} md={4}>
                <Grid container spacing={2} columns={12}>
                  <Grid xs={8} xsOffset={2}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          configs.length > 0
                            ? configs[0].rule?.replaceAll(
                                'style="color: rgba(0, 0, 0, 0.8);"',
                                ""
                              ) || ""
                            : "",
                      }}
                      // sx={{ color: "#e5e7eb" }}
                      className="text-[#e5e7eb]"
                    ></div>
                  </Grid>
                </Grid>
              </Grid>
            )}
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

      <MessageForRule
        isOpen={!!state.showRule && configs.length > 0}
        rule={configs.length > 0 ? configs[0].rule || "" : ""}
        onCancel={() =>
          dispatch({ type: ETypeState.UPDATE_SHOW_RULE, payload: false })
        }
      ></MessageForRule>

      <FooterClient></FooterClient>
    </>
  );
};

export default QuayThuongPage;
