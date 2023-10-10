import { ISegment } from "@/models/segment";
import { yupResolver } from "@hookform/resolvers/yup";
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
import * as yup from "yup";

interface IProps {
  isOpen: boolean;
  item?: ISegment;
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
  text: string;
  color: string;
  occurrence: number | 0;
  occurrenceTest: number | 0;
}
const schema = yup
  .object()
  .shape({
    text: yup.string().required("Voucher hông được bỏ trống"),
    color: yup.string().required("Màu sắc không được bỏ trống"),
    occurrence: yup
      .number()
      .min(0, "Tối thiểu là 0")
      .required("Số lần xuất hiện không được bỏ trống"),
    occurrenceTest: yup
      .number()
      .min(0, "Tối thiểu là 0")
      .required("Số lần xuất hiện (thử) không được bỏ trống"),
  })
  .required();

const DialogSegment = (props: IProps) => {
  const { control, handleSubmit, reset } = useForm<IFormInput>({
    mode: "onChange",
    defaultValues: {
      text: "",
      color: "#fff",
      occurrence: 0,
      occurrenceTest: 0,
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset(props.item);
  }, [props.item]);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
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
            } Voucher`}</DialogTitle>
            <DialogContent>
              <Box sx={{ my: 2 }}>
                <Controller
                  control={control}
                  name={"text"}
                  render={({ field, formState }) => (
                    <>
                      <TextField
                        fullWidth
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                        label="Voucher"
                        error={!!formState.errors["text"]}
                        helperText={`${
                          formState.errors["text"]?.message ?? ""
                        }`}
                      ></TextField>
                    </>
                  )}
                ></Controller>
              </Box>
              <Box sx={{ my: 2 }}>
                <Controller
                  control={control}
                  name={"color"}
                  render={({ field, formState }) => (
                    <>
                      <TextField
                        fullWidth
                        {...field}
                        type={"color"}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                        label="Màu sắc"
                        error={!!formState.errors["color"]}
                        helperText={`${
                          formState.errors["color"]?.message ?? ""
                        }`}
                      ></TextField>
                    </>
                  )}
                ></Controller>
              </Box>
              <Box sx={{ my: 2 }}>
                <Controller
                  control={control}
                  name={"occurrence"}
                  render={({ field, formState }) => (
                    <>
                      <TextField
                        fullWidth
                        {...field}
                        type={"number"}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                        label="Số lần xuất hiện"
                        error={!!formState.errors["occurrence"]}
                        helperText={`${
                          formState.errors["occurrence"]?.message ?? ""
                        }`}
                      ></TextField>
                    </>
                  )}
                ></Controller>
              </Box>
              <Box sx={{ my: 2 }}>
                <Controller
                  control={control}
                  name={"occurrenceTest"}
                  render={({ field, formState }) => (
                    <>
                      <TextField
                        fullWidth
                        {...field}
                        type={"number"}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                        label="Số lần xuất hiện (Thử)"
                        error={!!formState.errors["occurrenceTest"]}
                        helperText={`${
                          formState.errors["occurrenceTest"]?.message ?? ""
                        }`}
                      ></TextField>
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

export default DialogSegment;
