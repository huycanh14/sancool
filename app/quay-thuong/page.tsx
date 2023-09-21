"use client";
import { useAppSelector } from "@/common/hook";
import ChooseSwitch from "@/components/choose-switch";
import Wheel from "@/components/wheel";
import { ESwitch } from "@/enum/ESwitch";
import { Box, Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect } from "react";

const QuayThuongPage = () => {
  const switchStatus = useAppSelector((state) => state.switch.status);

  useEffect(() => {
    console.log("switchStatus", switchStatus);
  }, [switchStatus]);

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

      {/* <Wheel
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
          // {
          //   id: "5",
          //   text: "KIA TELLURIDE 2022",
          //   color: "#34A24F",
          // },
          // {
          //   id: "6",
          //   text: "KIA TELLURIDE 2022",
          //   color: "#34A24F",
          // },
          // {
          //   id: "7",
          //   text: "KIA TELLURIDE 2022",
          //   color: "#34A24F",
          // },
          // {
          //   id: "8",
          //   text: "KIA TELLURIDE 2022",
          //   color: "#34A24F",
          // },
          // {
          //   id: "9",
          //   text: "KIA TELLURIDE 2022",
          //   color: "#34A24F",
          // },
          // {
          //   id: "10",
          //   text: "KIA TELLURIDE 2022",
          //   color: "#34A24F",
          // },
          // {
          //   id: "11",
          //   text: "KIA TELLURIDE 2022",
          //   color: "#34A24F",
          // },
          // {
          //   id: "12",
          //   text: "KIA TELLURIDE 2022",
          //   color: "#34A24F",
          // },
          // {
          //   id: "13",
          //   text: "KIA TELLURIDE 2022",
          //   color: "#34A24F",
          // },
          // {
          //   id: "14",
          //   text: "KIA TELLURIDE 2022",
          //   color: "#34A24F",
          // },
          // {
          //   id: "15",
          //   text: "KIA TELLURIDE 2022",
          //   color: "#34A24F",
          // },
        ]}
        isOnlyOnce={true}
        isAccept={true}
        sxCanvas={{
          width: "100%",
        }}
        // winningSegment={{
        //   // id: "1",
        //   text: "I phone 13 pro max",
        //   color: "#EE4040",
        // }}
      /> */}
    </>
  );
};

export default QuayThuongPage;
