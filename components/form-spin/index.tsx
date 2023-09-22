import { useAppDispatch } from "@/common/hook";
import { EChannel } from "@/enum/EChannel";
import { EStatusSpin } from "@/enum/EStatusSpin";
import {
  CHANGE_STATUS_SPIN,
  RESET_USER_SPIN,
  SAVE_DATA_AFTER_SPIN,
} from "@/redux/slices/userSpinSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

interface IProps {
  isOpen: boolean;
  handleClose?: Function;
}

interface IFormInput {
  channel: string;
  phone: string;
}

const FormSpin = (props: IProps) => {
  const keys = Object.keys(EChannel).filter((key) => key !== "toString");
  const schema = yup
    .object()
    .shape({
      channel: yup.string().required("Kênh mua sắm không được bỏ trống"),
      phone: yup
        .string()
        .required("Số điện thoại không được bỏ trống")
        .test(
          "len",
          "Số điện thoại phải 10 ký tự",
          (val) => val.toString().length === 10
        ),
    })
    .required();

  const { control, handleSubmit, reset } = useForm<IFormInput>({
    mode: "onChange",
    defaultValues: {
      channel: "",
      phone: "",
    },
    resolver: yupResolver(schema),
  });
  const dispatchTookit = useAppDispatch();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    dispatchTookit(
      SAVE_DATA_AFTER_SPIN({
        phone: data.phone,
        channel: data.channel as EChannel,
      })
    );
    dispatchTookit(CHANGE_STATUS_SPIN(EStatusSpin.DOING));
  };

  const onCancel = () => {
    reset();
    dispatchTookit(RESET_USER_SPIN());
    dispatchTookit(CHANGE_STATUS_SPIN(EStatusSpin.NEW));
    props.handleClose && props.handleClose();
  };

  return (
    <>
      <Dialog open={props.isOpen} onClose={onCancel}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Thông tin nhận voucher</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Bạn cần điền thông tin bên dưới để bắt đầu quay thưởng
            </DialogContentText>

            <Box sx={{ my: 2 }}>
              <Controller
                control={control}
                name={"channel"}
                render={({ field, formState }) => (
                  <>
                    <TextField
                      select
                      error={!!formState.errors["channel"]}
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      fullWidth
                      helperText={`${
                        formState.errors["channel"]?.message ?? ""
                      }`}
                      label="Kênh thương mại đã mua"
                    >
                      {keys.map((value, index) => {
                        return (
                          <MenuItem
                            key={index}
                            // @ts-ignore
                            value={EChannel[value]}
                          >
                            {EChannel.toString(value as EChannel)}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                  </>
                )}
              ></Controller>
            </Box>
            <Box sx={{ my: 2 }}>
              <Controller
                control={control}
                name={"phone"}
                render={({ field, formState }) => (
                  <>
                    <TextField
                      fullWidth
                      error={!!formState.errors["phone"]}
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      helperText={`${formState.errors["phone"]?.message ?? ""}`}
                      label="Số điện thoại"
                    ></TextField>
                  </>
                )}
              ></Controller>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={onCancel}>Cancel</Button>
            <Button type="submit">Next</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default FormSpin;
