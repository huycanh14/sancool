"use client";
import { useAppDispatch, useAppSelector } from "@/common/hook";
import ChooseSwitch from "@/components/choose-switch";
import FormSpin from "@/components/form-spin";
import Wheel from "@/components/wheel";
import { ESwitch } from "@/enum/ESwitch";
import { UPDATE_SWITCH } from "@/redux/slices/switchSlice";
import { Box, Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect } from "react";

const QuayThuongPage = () => {
  const switchStatus = useAppSelector((state) => state.switch.status);
  const dispatchTookit = useAppDispatch();

  useEffect(() => {
    console.log("switchStatus", switchStatus);
  }, [switchStatus]);

  const handleCancel = () => {
    dispatchTookit(UPDATE_SWITCH(ESwitch.TRY));
    console.log("sss");
  };

  return (
    <>
      <Container sx={{ flexGrow: 1 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} columns={12}>
            <Grid
              md={6}
              xs={8}
              xsOffset={2}
              mdOffset={3}
              className={"flex justify-end"}
            >
              <ChooseSwitch></ChooseSwitch>
            </Grid>
            <Grid md={6} xs={8} xsOffset={2} mdOffset={3} sx={{}}>
              <Wheel
                segments={[
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
                ]}
                isOnlyOnce={true}
                isAccept={switchStatus === ESwitch.REAL}
                sxCanvas={{
                  width: "100%",
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>

      <FormSpin
        isOpen={switchStatus === ESwitch.REAL}
        handleClose={() => handleCancel()}
      ></FormSpin>
    </>
  );
};

export default QuayThuongPage;
