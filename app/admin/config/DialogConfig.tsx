import { IConfig } from "@/models/config";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Slide,
  TextField,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.core.css"; // Import Quill styles
import ReactQuill from "react-quill";

interface IProps {
  isOpen: boolean;
  item?: IConfig;
  handleClose: Function;
  handleSubmit: Function;
}
const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IFormInput {
  id?: string;
  rule?: string;
  limit?: number | 0;
  express?: number | 0;
  linkChatShopee?: string;
  linkChatTiktok?: string;
  linkFanpage?: string;
  linkShopee?: string;
  linkTiktok?: string;
  zalo?: string;
}

const DialogConfig = (props: IProps) => {
  const { control, handleSubmit, reset } = useForm<IFormInput>({
    mode: "onChange",
    defaultValues: {
      rule: "",
      limit: 0,
      express: 0,
      linkChatShopee: "",
      linkChatTiktok: "",
      linkFanpage: "",
      linkShopee: "",
      linkTiktok: "",
      zalo: "",
    },
  });

  useEffect(() => {
    reset(props.item);
  }, [props.item]);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    data.rule = data.rule?.replace(/(\\n)/g, "\n");
    props.handleSubmit(data);
  };

  return (
    <>
      <Dialog
        open={props.isOpen}
        TransitionComponent={Transition}
        fullWidth={true}
        maxWidth={"md"}
        keepMounted
        onClose={() => props.handleClose()}
        aria-describedby="alert-dialog-slide-description"
      >
        <Grid item xs={12} sm={8} md={5} component={Paper} square>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle>{`${
              props.item?.id ? "Sửa" : "Thêm"
            } Cấu hình`}</DialogTitle>
            <DialogContent>
              <Box sx={{ my: 2 }}>
                <Controller
                  control={control}
                  name={"express"}
                  render={({ field }) => (
                    <>
                      <TextField
                        type="number"
                        InputProps={{
                          inputProps: {
                            min: 0,
                          },
                        }}
                        fullWidth
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                        label="Ngày hết hạn"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      ></TextField>
                    </>
                  )}
                ></Controller>
              </Box>
              <Box sx={{ my: 2 }}>
                <Controller
                  control={control}
                  name={"limit"}
                  render={({ field }) => (
                    <>
                      <TextField
                        type="number"
                        InputProps={{
                          inputProps: {
                            min: 0,
                          },
                        }}
                        fullWidth
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                        label="Số lần quay/ngày"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      ></TextField>
                    </>
                  )}
                ></Controller>
              </Box>
              <Box sx={{ my: 2 }}>
                <Controller
                  control={control}
                  name={"linkShopee"}
                  render={({ field }) => (
                    <>
                      <TextField
                        fullWidth
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                        label="Link Shopee"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      ></TextField>
                    </>
                  )}
                ></Controller>
              </Box>
              <Box sx={{ my: 2 }}>
                <Controller
                  control={control}
                  name={"linkChatShopee"}
                  render={({ field }) => (
                    <>
                      <TextField
                        fullWidth
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                        label="Link Chat Shopee"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      ></TextField>
                    </>
                  )}
                ></Controller>
              </Box>
              <Box sx={{ my: 2 }}>
                <Controller
                  control={control}
                  name={"linkTiktok"}
                  render={({ field }) => (
                    <>
                      <TextField
                        fullWidth
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                        label="Link TikTok"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      ></TextField>
                    </>
                  )}
                ></Controller>
              </Box>
              <Box sx={{ my: 2 }}>
                <Controller
                  control={control}
                  name={"linkChatTiktok"}
                  render={({ field }) => (
                    <>
                      <TextField
                        fullWidth
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                        label="Link Chat TikTok"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      ></TextField>
                    </>
                  )}
                ></Controller>
              </Box>
              <Box sx={{ my: 2 }}>
                <Controller
                  control={control}
                  name={"linkFanpage"}
                  render={({ field }) => (
                    <>
                      <TextField
                        fullWidth
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                        label="Link Fanpage Fb"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      ></TextField>
                    </>
                  )}
                ></Controller>
              </Box>
              <Box sx={{ my: 2 }}>
                <Controller
                  control={control}
                  name={"zalo"}
                  render={({ field }) => (
                    <>
                      <TextField
                        fullWidth
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                        label="Zalo"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      ></TextField>
                    </>
                  )}
                ></Controller>
              </Box>
              <label htmlFor="rule">Quy định</label>
              <Box sx={{ my: 2 }}>
                <Controller
                  control={control}
                  name={"rule"}
                  render={({ field }) => (
                    <>
                      {/* <TextField
                        multiline
                        fullWidth
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                        label="Quy định"
                        rows={20}
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      ></TextField> */}
                      <ReactQuill
                        id="rule"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                        style={{
                          height: 250,
                        }}
                      ></ReactQuill>
                    </>
                  )}
                ></Controller>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => props.handleClose()} variant="outlined">
                Hủy
              </Button>
              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white"
                variant="contained"
              >
                Xác nhận
              </Button>
            </DialogActions>
          </form>
        </Grid>
      </Dialog>
    </>
  );
};

export default DialogConfig;
