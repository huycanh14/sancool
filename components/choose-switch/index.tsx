"use client";
import { useAppDispatch, useAppSelector } from "@/common/hook";
import { EStatusSpin } from "@/enum/EStatusSpin";
import { ESwitch } from "@/enum/ESwitch";
import { UPDATE_SWITCH } from "@/redux/slices/switchSlice";
import { CHANGE_STATUS_SPIN } from "@/redux/slices/userSpinSlice";
import {
  FormGroup,
  Stack,
  Switch,
  SwitchProps,
  Typography,
  styled,
} from "@mui/material";

interface Props {
  txtTry?: string;
  txtReal?: string;
}

const ChooseSwitch = (props: Props) => {
  const widthSwitch = "22vmin";
  const heightSwitch = "10vmin";
  const SwitchStyled = styled((props: SwitchProps) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    // width: 42,
    // height: 26,
    width: widthSwitch,
    height: heightSwitch,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      // margin: 2,
      margin: 0,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: `translateX(calc(${widthSwitch} - ${heightSwitch} - 0.5px))`,
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#2ECA45" : "#3da5e0",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      // width: 22,
      // height: 22,
      width: heightSwitch,
      height: heightSwitch,
    },
    "& .MuiSwitch-track": {
      // borderRadius: 26 / 2,
      borderRadius: heightSwitch,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  const switchStatus = useAppSelector((state) => state.switch.status);

  const dispatchTookit = useAppDispatch();

  const handleChange = (checked: boolean) => {
    if (!!checked) {
      dispatchTookit(UPDATE_SWITCH(ESwitch.REAL));
      dispatchTookit(CHANGE_STATUS_SPIN(EStatusSpin.READY));
    } else {
      dispatchTookit(UPDATE_SWITCH(ESwitch.TRY));
      dispatchTookit(CHANGE_STATUS_SPIN(EStatusSpin.NEW));
    }
  };

  return (
    <>
      <FormGroup>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography
            sx={{ fontSize: "1.5rem", textTransform: "uppercase" }}
            // className="text-[#455A64]"
          >
            {props.txtTry || "Try"}
          </Typography>
          <SwitchStyled
            inputProps={{ "aria-label": "ant design" }}
            onChange={(_, checked) => handleChange(checked)}
            checked={switchStatus === ESwitch.REAL}
          />
          <Typography
            sx={{ fontSize: "1.5rem", textTransform: "uppercase" }}
            // className="text-[#455A64]"
          >
            {props.txtReal || "Real"}
          </Typography>
        </Stack>
      </FormGroup>
    </>
  );
};

export default ChooseSwitch;
