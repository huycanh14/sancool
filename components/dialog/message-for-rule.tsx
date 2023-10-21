import { Dialog, Box, DialogTitle, DialogActions, Button } from "@mui/material";

interface Props {
  isOpen: boolean;
  rule: string;
  onCancel: Function;
}

const MessageForRule = (props: Props) => {
  return (
    <>
      <Dialog
        open={!!props.isOpen}
        onClose={() => props.onCancel && props.onCancel()}
      >
        <Box>
          <DialogTitle>
            <div dangerouslySetInnerHTML={{ __html: props.rule }}></div>
          </DialogTitle>
        </Box>
        <Box sx={{ my: 2 }}>
          <DialogActions>
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white"
              variant="contained"
              onClick={() => props.onCancel && props.onCancel()}
            >
              Đồng ý
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default MessageForRule;
