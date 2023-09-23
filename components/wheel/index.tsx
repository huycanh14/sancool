"use client";
import { CSSProperties, useEffect, useReducer, useRef, useState } from "react";
import { ISegment } from "@/models/segment";
import { Fab, styled } from "@mui/material";
import { useAppDispatch } from "@/common/hook";
import { CHANGE_STATUS_SPIN } from "@/redux/slices/userSpinSlice";
import { EStatusSpin } from "@/enum/EStatusSpin";

interface Props {
  segments: ISegment[];
  onFinished?: Function | null;
  primaryColor?: string | "gray";
  contrastColor?: string | "white";
  buttonText?: string | "Spin";
  isOnlyOnce?: boolean | true;
  isAccept?: boolean;
  sxCanvas?: CSSProperties;
}

interface IState {
  idTest: string;
}

const reducer = (state: IState, action: any) => {
  switch (action.type) {
    case "UPDATE_ID":
      state.idTest = action.value;
      return { ...state };
    default:
      return { ...state };
  }
};

const Wheel = (props: Props) => {
  const {
    segments,
    primaryColor,
    contrastColor,
    buttonText,
    onFinished,
    isOnlyOnce,
    isAccept,
    sxCanvas,
  } = props;

  const ButtonStyled = styled(Fab)(({}) => ({
    position: "absolute",
    transform: "translate(-50%, -50%)",
    top: "50%",
    left: "50%",
    fontSize: "2.5vmin;",
    fontWeight: "bold",
    fontFamily: "proxima-nova",
    backgroundColor: `${primaryColor || "black"} !important`,
    width: "18%",
    height: "18%",
    minHeight: "56px",
    minWidth: "56px",
    border: "5px solid white",
    textAlign: "center",
    color: contrastColor || "white",
    "::after": {
      width: "20px",
      content: '""',
      height: "20px",
      borderTop: "20px solid transparent",
      borderLeft: `20px solid ${contrastColor || "white"}`,
      clear: "both",
      transform: "rotate(135deg)",
      top: "-11px",
      position: "absolute",
    },
  }));

  let currentSegment: ISegment;
  const isStarted = useRef(false);
  let timerHandle: NodeJS.Timeout | number | null = 0;
  const timerDelay = 10;
  let angleCurrent = 0;
  let angleDelta = 0;
  const size = 290;
  const canvasContext = useRef(null as any);
  let maxSpeed = Math.PI / timerDelay;
  const upTime = timerDelay * 100;
  const downTime = timerDelay * 1000;
  const idDefault = "_______XXXXXXXX";
  let spinStart = 0;
  let frames = 0;
  const [isFinished, setFinished] = useState(false);
  const winningSegment = useRef(null as ISegment | null);
  const [state, dispatch] = useReducer(reducer, { idTest: "-1" });
  const idWin = useRef(idDefault);
  const centerX = 300;
  const centerY = 300;

  const dispatchTookit = useAppDispatch();

  const drawSegment = (key: number, lastAngle: number, angle: number) => {
    const ctx = canvasContext.current;
    const value = segments[key];
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, size, lastAngle, angle, false);
    ctx.lineTo(centerX, centerY);
    ctx.closePath();
    ctx.fillStyle = value.color;
    ctx.fill();
    ctx.stroke();
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((lastAngle + angle) / 2);
    ctx.fillStyle = contrastColor || "white";
    ctx.font = "bold 1.2rem proxima-nova";
    ctx.fillText((value.text || "").substr(0, 21), size / 2 + 20, 0);
    ctx.restore();
  };

  const drawWheel = () => {
    const ctx = canvasContext.current;
    let lastAngle = angleCurrent;
    const len = segments.length;
    const PI2 = Math.PI * 2;

    // debugger;
    ctx.lineWidth = 1;
    ctx.strokeStyle = primaryColor || "black";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font = "1em proxima-nova";
    for (let i = 1; i <= len; i++) {
      const angle = PI2 * (i / len) + angleCurrent;
      drawSegment(i - 1, lastAngle, angle);
      lastAngle = angle;
    }

    // Draw a center circle
    ctx.beginPath();
    const circle = new Path2D();
    ctx.arc(centerX, centerY, 50, 0, PI2, false);
    circle.arc(centerX, centerY, 50, 0, PI2, false);
    ctx.closePath();
    ctx.fillStyle = primaryColor || "black";
    ctx.lineWidth = 10;
    ctx.strokeStyle = contrastColor || "white";
    ctx.fill(circle);
    ctx.font = "bold 1em proxima-nova";
    ctx.fillStyle = contrastColor || "white";
    ctx.textAlign = "center";
    ctx.fillText(buttonText || "Spin", centerX, centerY + 3);
    ctx.stroke();
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;

    // // Draw outer circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, size, 0, PI2, false);
    ctx.closePath();

    ctx.lineWidth = 10;
    ctx.strokeStyle = primaryColor || "black";
    ctx.stroke();
  };

  const clear = () => {
    if (!!canvasContext.current) {
      const ctx = canvasContext.current;
      ctx.clearRect(0, 0, 1000, 500);
    }
  };

  const drawNeedle = () => {
    const ctx = canvasContext.current;
    ctx.lineWidth = 1;
    ctx.strokeStyle = contrastColor || "white";
    ctx.fileStyle = contrastColor || "white";
    ctx.beginPath();
    ctx.moveTo(centerX + 20, centerY - 50);
    ctx.lineTo(centerX - 20, centerY - 50);
    ctx.lineTo(centerX, centerY - 70);
    ctx.closePath();
    ctx.fill();
    const change = angleCurrent + Math.PI / 2;
    let i =
      segments.length -
      Math.floor((change / (Math.PI * 2)) * segments.length) -
      1;
    if (i < 0) i = i + segments.length;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = primaryColor || "black";
    ctx.font = "bold 1.5em proxima-nova";
    currentSegment = segments[i];
    isStarted.current &&
      ctx.fillText(currentSegment, centerX + 10, centerY + size + 50);
  };

  const draw = () => {
    clear();
    drawWheel();
    drawNeedle();
  };

  const onTimerTick = () => {
    frames++;
    draw();
    const duration = new Date().getTime() - spinStart;
    let progress = 0;
    let finished = false;
    if (duration < upTime) {
      progress = duration / upTime;
      angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2);
    } else {
      if (winningSegment.current) {
        if (currentSegment.id === idWin.current && frames > segments.length) {
          progress = duration / upTime;
          angleDelta =
            maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
          progress = 1;
        } else {
          progress = duration / downTime;
          angleDelta =
            maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
        }
      } else {
        progress = duration / downTime;
        angleDelta =
          maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
      }
      if (progress >= 1) finished = true;
    }
    angleCurrent += angleDelta;
    while (angleCurrent >= Math.PI * 2) angleCurrent -= Math.PI * 2;
    if (finished) {
      setFinished(true);
      dispatch({ type: "UPDATE_ID", value: "-1" });
      idWin.current = idDefault;
      if (onFinished) onFinished(currentSegment);
      if (timerHandle) clearInterval(timerHandle);
      timerHandle = 0;
      angleDelta = 0;
      isStarted.current = false;
      dispatchTookit(CHANGE_STATUS_SPIN(EStatusSpin.DONE));
    }
  };

  const spin = () => {
    dispatchTookit(CHANGE_STATUS_SPIN(EStatusSpin.DOING));
    winningSegment.current = null;
    isStarted.current = true;
    const lenIds: string[] = [];
    let id = idDefault;
    if (!!isAccept) {
      segments.forEach((element) => {
        for (let i = 0; i < (element.occurrence || 0); i++)
          lenIds.push(element.id || "");
      });
      lenIds.sort(() => Math.random() - 0.5);
      id = lenIds[(Math.random() * lenIds.length) | 0];
      winningSegment.current = { id: id };
    } else {
      segments.forEach((element) => {
        lenIds.push(element.id || "");
      });
      id = lenIds[(Math.random() * lenIds.length) | 0];
      winningSegment.current = { id: id };
    }
    if (timerHandle === 0) {
      spinStart = new Date().getTime();
      maxSpeed = Math.PI / 10;
      frames = 0;
      timerHandle = setInterval(onTimerTick, timerDelay);
      setTimeout(() => {
        dispatch({ type: "UPDATE_ID", value: "1" });
        idWin.current = id;
      }, (timerDelay - 3) * 1000);
    }
  };

  const initCanvas = () => {
    let canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (navigator.appVersion.indexOf("MSIE") !== -1) {
      canvas = document.createElement("canvas");
      canvas.setAttribute("width", "1000");
      canvas.setAttribute("height", "600");
      canvas.setAttribute("id", "canvas");
      document.getElementById("wheel")?.appendChild(canvas);
    }
    canvasContext.current = canvas.getContext("2d");
  };
  const wheelDraw = () => {
    clear();
    drawWheel();
    drawNeedle();
  };

  const wheelInit = () => {
    initCanvas();
    wheelDraw();
  };

  useEffect(() => {
    wheelInit();
    setTimeout(() => {
      window.scrollTo(0, 1);
    }, 0);
  }, []);

  return (
    <div id="wheel" style={{ position: "relative" }}>
      <canvas
        id="canvas"
        width="600"
        height="600"
        style={{
          pointerEvents: isFinished && !isOnlyOnce ? "none" : "auto",
          ...sxCanvas,
        }}
      />
      <ButtonStyled id="spin" onClick={() => !isStarted.current && spin()}>
        {buttonText || "Spin"}
      </ButtonStyled>
    </div>
  );
};

export default Wheel;
