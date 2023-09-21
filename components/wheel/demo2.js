"use client";
import { useEffect, useState } from "react";
import { ISegment } from "@/models/segment";

interface Props {
  segments: ISegment[];
  winningSegment?: ISegment;
  onFinished?: Function | null;
  primaryColor?: string | "gray";
  contrastColor?: string | "white";
  buttonText?: string | "Spin";
  isOnlyOnce?: boolean | true;
}

const Wheel = (props: Props) => {
  const {
    segments,
    primaryColor,
    contrastColor,
    buttonText,
    winningSegment,
    onFinished,
    isOnlyOnce,
  } = props;
  let currentSegment: ISegment;
  let isStarted = false;
  let timerHandle: NodeJS.Timeout | number | null = 0;
  const timerDelay = segments.length;
  let angleCurrent = 0;
  let angleDelta = 0;
  const size = 290;
  let canvasContext: any;
  let maxSpeed = Math.PI / segments.length;
  const upTime = segments.length * 100;
  const downTime = segments.length * 1000;
  let spinStart = 0;
  let frames = 0;
  const [isFinished, setFinished] = useState(false);
  const centerX = 300;
  const centerY = 300;

  const drawSegment = (key: number, lastAngle: number, angle: number) => {
    const ctx = canvasContext;
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
    ctx.font = "bold 1em proxima-nova";
    ctx.fillText(value.text.substr(0, 21), size / 2 + 20, 0);
    ctx.restore();
  };

  const drawWheel = () => {
    const ctx = canvasContext;
    let lastAngle = angleCurrent;
    const len = segments.length;
    const PI2 = Math.PI * 2;
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
    // ctx.arc(centerX, centerY, 50, 0, PI2, false);
    // ctx.closePath();
    // ctx.fillStyle = primaryColor || "black";
    // ctx.lineWidth = 10;
    // ctx.strokeStyle = contrastColor || "white";
    // ctx.fill();
    // ctx.font = "bold 1em proxima-nova";
    // ctx.fillStyle = contrastColor || "white";
    // ctx.textAlign = "center";
    // ctx.fillText(buttonText || "Spin", centerX, centerY + 3);
    // ctx.stroke();

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
    canvas.addEventListener(
      "click",
      function (event) {
        if (ctx.isPointInPath(circle, event.clientX, event.clientY)) {
          spin();
        }
      },
      false
    );

    // // Draw outer circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, size, 0, PI2, false);
    ctx.closePath();

    ctx.lineWidth = 10;
    ctx.strokeStyle = primaryColor || "black";
    ctx.stroke();
  };

  const clear = () => {
    if (!!canvasContext) {
      const ctx = canvasContext;
      ctx.clearRect(0, 0, 1000, 500);
    }
  };

  const drawNeedle = () => {
    const ctx = canvasContext;
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
    isStarted &&
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
      if (winningSegment) {
        if (
          currentSegment.id === winningSegment.id &&
          frames > segments.length
        ) {
          console.log("11");
          progress = duration / upTime;
          angleDelta =
            maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
          progress = 1;
        } else {
          console.log("11222");

          progress = duration / downTime;
          angleDelta =
            maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
        }
      } else {
        console.log("2222");

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
      if (onFinished) onFinished(currentSegment);
      if (timerHandle) clearInterval(timerHandle);
      timerHandle = 0;
      angleDelta = 0;
    }
  };

  const spin = () => {
    isStarted = true;
    if (timerHandle === 0) {
      spinStart = new Date().getTime();
      maxSpeed = Math.PI / segments.length;
      frames = 0;
      timerHandle = setInterval(onTimerTick, timerDelay);
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

    // canvas.addEventListener("click", spin, false);
    canvasContext = canvas.getContext("2d");
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
    <div id="wheel">
      <canvas
        id="canvas"
        width="600"
        height="600"
        style={{
          pointerEvents: isFinished && !isOnlyOnce ? "none" : "auto",
        }}
      />
    </div>
  );
};

export default Wheel;
