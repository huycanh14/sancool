/* eslint-disable @next/next/no-img-element */
import { ISegment } from "@/models/segment";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface IProps {
  isOpen?: boolean;
  onCancel?: Function;
  onGoToShop?: Function;
  segment?: ISegment;
}

const MessageFinishedForReal = (props: IProps) => {
  return (
    <>
      <Dialog
        open={!!props.isOpen}
        onClose={() => props.onCancel && props.onCancel()}
      >
        <Box sx={{ mx: 10, my: 2 }}>
          <img
            src="/voucher.png"
            alt="voucher"
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
        <Box>
          <DialogTitle>
            Chúc mừng bạn đã nhận được giải thưởng là: {props.segment?.text}{" "}
            !!!!
          </DialogTitle>
          <DialogContentText sx={{ mx: 3, my: 1 }}>
            Chọn &quot;Nhận giải&quot; để liên lạc với shop để nhận giải
            thưởng. Nên chụp lại màn hình kết quả
          </DialogContentText>
        </Box>
        <Box sx={{ my: 2 }}>
          <DialogActions>
            <Button
              onClick={() => props.onCancel && props.onCancel()}
              variant="outlined"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white"
              onClick={() => props.onGoToShop && props.onGoToShop()}
            >
              Nhận giải
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default MessageFinishedForReal;
