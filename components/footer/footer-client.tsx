import { Box, Grid, Typography, Container, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useAppSelector } from "@/common/hook";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import scss from "./footer-clients.module.scss";
const FooterClient = () => {
  const configs = useAppSelector((state) => state.config.configs);

  const goToLink = (url: string) => {
    window.open(url, "_blank", "noreferrer");
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "auto",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          position: {
            md: "fixed",
            xs: "unset",
          },
          bottom: 0,
          // backgroundColor: "rgba(51,51,51,.95)",
          backgroundColor: "rgb(19 18 18 / 95%)",
        }}
      >
        <Container maxWidth="lg">
          <Grid container className="items-center">
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                textAlign: {
                  xs: "center",
                  md: "left",
                },
              }}
            >
              <IconButton
                sx={{ m: 1, backgroundColor: "#0866FF" }}
                className="bg-[#0866FF]"
                onClick={() =>
                  goToLink(
                    configs.length > 0
                      ? configs[0].linkFanpage || "https://fb.com"
                      : "https://fb.com"
                  )
                }
              >
                <FacebookIcon className="text-white"> </FacebookIcon>
              </IconButton>
              <IconButton
                sx={{ m: 1 }}
                onClick={() =>
                  goToLink(
                    configs.length > 0
                      ? configs[0].linkShopee || "https://shopee.vn"
                      : "https://shopee.vn"
                  )
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="45"
                  height="45"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#f4511e"
                    d="M36.683,43H11.317c-2.136,0-3.896-1.679-3.996-3.813l-1.272-27.14C6.022,11.477,6.477,11,7.048,11 h33.904c0.571,0,1.026,0.477,0.999,1.047l-1.272,27.14C40.579,41.321,38.819,43,36.683,43z"
                  ></path>
                  <path
                    fill="#f4511e"
                    d="M32.5,11.5h-2C30.5,7.364,27.584,4,24,4s-6.5,3.364-6.5,7.5h-2C15.5,6.262,19.313,2,24,2 S32.5,6.262,32.5,11.5z"
                  ></path>
                  <path
                    fill="#fafafa"
                    d="M24.248,25.688c-2.741-1.002-4.405-1.743-4.405-3.577c0-1.851,1.776-3.195,4.224-3.195 c1.685,0,3.159,0.66,3.888,1.052c0.124,0.067,0.474,0.277,0.672,0.41l0.13,0.087l0.958-1.558l-0.157-0.103 c-0.772-0.521-2.854-1.733-5.49-1.733c-3.459,0-6.067,2.166-6.067,5.039c0,3.257,2.983,4.347,5.615,5.309 c3.07,1.122,4.934,1.975,4.934,4.349c0,1.828-2.067,3.314-4.609,3.314c-2.864,0-5.326-2.105-5.349-2.125l-0.128-0.118l-1.046,1.542 l0.106,0.087c0.712,0.577,3.276,2.458,6.416,2.458c3.619,0,6.454-2.266,6.454-5.158C30.393,27.933,27.128,26.741,24.248,25.688z"
                  ></path>
                </svg>
              </IconButton>
              <IconButton
                sx={{ m: 1 }}
                onClick={() =>
                  goToLink(
                    configs.length > 0
                      ? configs[0].linkTiktok || "https://tiktok.com"
                      : "https://tiktok.com"
                  )
                }
              >
                <svg
                  viewBox="0 0 291.72499821636245 291.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                >
                  <path d="M219.51 291.1H71.58C32.05 291.1 0 259.05 0 219.51V71.58C0 32.05 32.05 0 71.58 0h147.93c39.53 0 71.58 32.05 71.58 71.58v147.93c.01 39.54-32.04 71.59-71.58 71.59z" />
                  <g fill="#25f4ee">
                    <path d="M120.96 123.89v-8.8a64.83 64.83 0 0 0-9.23-.79c-29.93-.06-56.42 19.33-65.41 47.87s1.62 59.62 26.18 76.71c-25.77-27.58-24.3-70.83 3.28-96.6a68.425 68.425 0 0 1 45.18-18.39z" />
                    <path d="M122.62 223.53c16.73-.02 30.48-13.2 31.22-29.92V44.44h27.25a50.7 50.7 0 0 1-.79-9.44h-37.27v149.02c-.62 16.8-14.41 30.11-31.22 30.14-5.02-.04-9.97-1.28-14.42-3.6a31.276 31.276 0 0 0 25.23 12.97zM231.98 95.05v-8.29c-10.03 0-19.84-2.96-28.19-8.51a51.63 51.63 0 0 0 28.19 16.8z" />
                  </g>
                  <path
                    d="M203.8 78.26a51.301 51.301 0 0 1-12.76-33.89h-9.95a51.564 51.564 0 0 0 22.71 33.89zM111.73 151.58c-17.28.09-31.22 14.17-31.13 31.45a31.293 31.293 0 0 0 16.71 27.53c-10.11-13.96-6.99-33.48 6.97-43.6a31.191 31.191 0 0 1 18.34-5.93c3.13.04 6.24.53 9.23 1.45v-37.93c-3.05-.46-6.14-.7-9.23-.72h-1.66v28.84c-3.01-.82-6.12-1.18-9.23-1.09z"
                    fill="#fe2c55"
                  />
                  <path
                    d="M231.98 95.05v28.84a88.442 88.442 0 0 1-51.69-16.8v75.77c-.08 37.81-30.75 68.42-68.56 68.42a67.816 67.816 0 0 1-39.22-12.4c25.73 27.67 69.02 29.25 96.7 3.52a68.397 68.397 0 0 0 21.83-50.09v-75.56a88.646 88.646 0 0 0 51.76 16.58V96.21c-3.64-.02-7.26-.4-10.82-1.16z"
                    fill="#fe2c55"
                  />
                  <path
                    d="M180.29 182.87V107.1a88.505 88.505 0 0 0 51.76 16.58V94.84a51.73 51.73 0 0 1-28.26-16.58 51.634 51.634 0 0 1-22.71-33.89h-27.25v149.24c-.71 17.27-15.27 30.69-32.54 29.99a31.278 31.278 0 0 1-24.06-12.9c-15.29-8.05-21.16-26.97-13.11-42.26a31.274 31.274 0 0 1 27.53-16.71c3.13.03 6.24.51 9.23 1.44V123.9c-37.74.64-67.82 32.19-67.18 69.93a68.353 68.353 0 0 0 18.73 45.86 67.834 67.834 0 0 0 39.29 11.61c37.82-.01 68.49-30.62 68.57-68.43z"
                    fill="#fff"
                  />
                </svg>
              </IconButton>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                color="textSecondary"
                variant="subtitle1"
                sx={{
                  m: 1,
                  textAlign: {
                    xs: "center",
                    md: "right",
                  },
                  color: "#e5e7eb",
                }}
                className={"text-white"}
              >
                © 2023 Sancool. All rights reserved.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <>
        <div
          className={scss["top-to-btm"]}
          onClick={() =>
            goToLink(
              configs.length > 0
                ? configs[0].zalo || "https://chat.zalo.me"
                : "https://chat.zalo.me"
            )
          }
        >
          <div className={`${scss["icon-position"]} ${scss["icon-style"]}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="60"
              height="60"
              viewBox="0 0 48 48"
            >
              <path
                fill="#2962ff"
                d="M15,36V6.827l-1.211-0.811C8.64,8.083,5,13.112,5,19v10c0,7.732,6.268,14,14,14h10	c4.722,0,8.883-2.348,11.417-5.931V36H15z"
              ></path>
              <path
                fill="#eee"
                d="M29,5H19c-1.845,0-3.601,0.366-5.214,1.014C10.453,9.25,8,14.528,8,19	c0,6.771,0.936,10.735,3.712,14.607c0.216,0.301,0.357,0.653,0.376,1.022c0.043,0.835-0.129,2.365-1.634,3.742	c-0.162,0.148-0.059,0.419,0.16,0.428c0.942,0.041,2.843-0.014,4.797-0.877c0.557-0.246,1.191-0.203,1.729,0.083	C20.453,39.764,24.333,40,28,40c4.676,0,9.339-1.04,12.417-2.916C42.038,34.799,43,32.014,43,29V19C43,11.268,36.732,5,29,5z"
              ></path>
              <path
                fill="#2962ff"
                d="M36.75,27C34.683,27,33,25.317,33,23.25s1.683-3.75,3.75-3.75s3.75,1.683,3.75,3.75	S38.817,27,36.75,27z M36.75,21c-1.24,0-2.25,1.01-2.25,2.25s1.01,2.25,2.25,2.25S39,24.49,39,23.25S37.99,21,36.75,21z"
              ></path>
              <path
                fill="#2962ff"
                d="M31.5,27h-1c-0.276,0-0.5-0.224-0.5-0.5V18h1.5V27z"
              ></path>
              <path
                fill="#2962ff"
                d="M27,19.75v0.519c-0.629-0.476-1.403-0.769-2.25-0.769c-2.067,0-3.75,1.683-3.75,3.75	S22.683,27,24.75,27c0.847,0,1.621-0.293,2.25-0.769V26.5c0,0.276,0.224,0.5,0.5,0.5h1v-7.25H27z M24.75,25.5	c-1.24,0-2.25-1.01-2.25-2.25S23.51,21,24.75,21S27,22.01,27,23.25S25.99,25.5,24.75,25.5z"
              ></path>
              <path
                fill="#2962ff"
                d="M21.25,18h-8v1.5h5.321L13,26h0.026c-0.163,0.211-0.276,0.463-0.276,0.75V27h7.5	c0.276,0,0.5-0.224,0.5-0.5v-1h-5.321L21,19h-0.026c0.163-0.211,0.276-0.463,0.276-0.75V18z"
              ></path>
            </svg>
          </div>
        </div>
      </>
    </>
  );
};

export default FooterClient;
