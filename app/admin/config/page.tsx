"use client";
import { useAppDispatch, useAppSelector } from "@/common/hook";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import { useEffect, useReducer } from "react";
import { ISegment } from "@/models/segment";
import { ETypeState, reducer } from "./reducer";
import {
  createConfig,
  getConfigs,
  updateConfig,
} from "@/redux/slices/configSlice";
import DialogConfig from "./DialogConfig";
import { IConfig } from "@/models/config";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";

const AdminConfigPage = () => {
  const configs = useAppSelector((state) => state.config.configs);
  const dispatchTookit = useAppDispatch();
  const [state, dispatch] = useReducer(reducer, {
    isOpen: false,
    config: {},
  });

  const handleClose = () => {
    dispatch({ type: ETypeState.CHANGE_DIALOG, payload: false });
    dispatch({ type: ETypeState.CREATE_CONFIG, payload: null });
  };

  const handleClickEdit = (payload: IConfig) => {
    dispatch({ type: ETypeState.CHANGE_DIALOG, payload: true });
    dispatch({ type: ETypeState.UPDATE_CONFIG, payload: payload });
  };

  const handleSubmit = async (payload: IConfig) => {
    let res;
    if (!!payload.id) {
      res = await dispatchTookit(updateConfig(payload));
    } else {
      res = await dispatchTookit(createConfig(payload));
    }
    if (!!res) {
      handleClose();
      toast.success(`${!!payload.id ? "Sửa" : "Thêm"} thành công`);
    } else {
      toast.success(`${!!payload.id ? "Sửa" : "Thêm"} thất bại`);
    }
  };

  useEffect(() => {
    dispatchTookit(getConfigs());
  }, []);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <Toolbar
            sx={{
              pl: { sm: 2 },
              pr: { xs: 1, sm: 1 },
              ...{
                bgcolor: (theme) =>
                  alpha(
                    theme.palette.primary.main,
                    theme.palette.action.activatedOpacity
                  ),
              },
            }}
          >
            <Typography
              sx={{ flex: "1 1 100%" }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              Thông tin cấu hình
            </Typography>
            <Tooltip title="Filter list">
              <IconButton
                onClick={(e) => {
                  if (configs.length > 0) {
                    handleClickEdit(configs[0]);
                  }
                }}
              >
                <EditIcon></EditIcon>
              </IconButton>
            </Tooltip>
          </Toolbar>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <TableHead>
                <TableRow>
                  <TableCell>Tên</TableCell>
                  <TableCell align="right">Nội dung</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {configs.length > 0 && (
                  <>
                    <TableRow hover tabIndex={-1} sx={{ cursor: "pointer" }}>
                      <TableCell component="th" scope="row" padding="none">
                        Ngày hết hạn
                      </TableCell>
                      <TableCell align="right">{configs[0].express}</TableCell>
                      {/* <TableCell
                      onClick={(event) => handleClick(event, row.id + "")}
                    >
                      {row.color}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleClickEdit(row)}>
                        <EditIcon></EditIcon>
                      </IconButton>
                    </TableCell> */}
                    </TableRow>
                    <TableRow hover tabIndex={-1} sx={{ cursor: "pointer" }}>
                      <TableCell component="th" scope="row" padding="none">
                        Số lần quay/ngày
                      </TableCell>
                      <TableCell align="right">{configs[0].limit}</TableCell>
                    </TableRow>
                    <TableRow hover tabIndex={-1} sx={{ cursor: "pointer" }}>
                      <TableCell component="th" scope="row" padding="none">
                        Link Shopee
                      </TableCell>
                      <TableCell align="right">
                        {configs[0].linkShopee}
                      </TableCell>
                    </TableRow>
                    <TableRow hover tabIndex={-1} sx={{ cursor: "pointer" }}>
                      <TableCell component="th" scope="row" padding="none">
                        Link Chat Shopee
                      </TableCell>
                      <TableCell align="right">
                        {configs[0].linkChatShopee}
                      </TableCell>
                    </TableRow>
                    <TableRow hover tabIndex={-1} sx={{ cursor: "pointer" }}>
                      <TableCell component="th" scope="row" padding="none">
                        Link TikTok
                      </TableCell>
                      <TableCell align="right">
                        {configs[0].linkTiktok}
                      </TableCell>
                    </TableRow>
                    <TableRow hover tabIndex={-1} sx={{ cursor: "pointer" }}>
                      <TableCell component="th" scope="row" padding="none">
                        Link Chat TikTok
                      </TableCell>
                      <TableCell align="right">
                        {configs[0].linkChatTiktok}
                      </TableCell>
                    </TableRow>
                    <TableRow hover tabIndex={-1} sx={{ cursor: "pointer" }}>
                      <TableCell component="th" scope="row" padding="none">
                        Link Fanpage Fb
                      </TableCell>
                      <TableCell align="right">
                        {configs[0].linkFanpage}
                      </TableCell>
                    </TableRow>
                    <TableRow hover tabIndex={-1} sx={{ cursor: "pointer" }}>
                      <TableCell component="th" scope="row" padding="none">
                        Zalo
                      </TableCell>
                      <TableCell align="right">{configs[0].zalo}</TableCell>
                    </TableRow>
                    <TableRow hover tabIndex={-1} sx={{ cursor: "pointer" }}>
                      <TableCell component="th" scope="row" padding="none">
                        Quy định
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          sx={{
                            display: "-webkit-box",
                            overflow: "hidden",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 3,
                          }}
                          variant="body1"
                        >
                          <span
                            dangerouslySetInnerHTML={{
                              __html:
                                configs.length > 0 ? configs[0].rule || "" : "",
                            }}
                          ></span>
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
      <DialogConfig
        isOpen={state.isOpen}
        handleClose={handleClose}
        item={state.config}
        handleSubmit={handleSubmit}
      ></DialogConfig>
    </>
  );
};

export default AdminConfigPage;
