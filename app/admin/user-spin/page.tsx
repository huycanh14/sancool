"use client";
import { useAppDispatch, useAppSelector } from "@/common/hook";
import { IHeadCell } from "@/common/models/IHeadCell";
import { IUserSpin } from "@/models/user-spin";
import { deleteUserSpins, getUserSpins } from "@/redux/slices/userSpinSlice";
import {
  Box,
  Button,
  Checkbox,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import React from "react";
import { getComparator, stableSort } from "@/common/table";
import { Order } from "@/type/order";
import { EnhancedTableHead } from "@/components/table/EnhancedTableHead";
import EnhancedTableToolbar from "@/components/table/EnhancedTableToolbar";
import { format } from "date-fns";
import { EChannel } from "@/enum/EChannel";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { toast } from "react-toastify";
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

interface IFormInput {
  phone?: string | null;
  channel?: EChannel | null | string;
  startAt?: Date | null | string;
  endAt?: Date | null | string;
}
const AdminUserSpinPage = () => {
  const userSpinCores = useAppSelector((state) => state.userSpin.userSpins);
  const dispatchTookit = useAppDispatch();

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof IUserSpin>("id");
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userSpins, setUserSpins] = useState([] as IUserSpin[]);

  const headCells: IHeadCell<IUserSpin>[] = [
    {
      id: "id",
      numeric: false,
      disablePadding: true,
      label: "Số điện thoại",
    },
    {
      id: "channel",
      numeric: false,
      disablePadding: false,
      label: "Kênh mua sắm",
    },
    {
      id: "segment",
      numeric: false,
      disablePadding: false,
      label: "Voucher",
    },
    {
      id: "createdAt",
      numeric: false,
      disablePadding: false,
      label: "Thời gian quay",
    },
    {
      id: "expiredAt",
      numeric: false,
      disablePadding: false,
      label: "Hạn sử dụng",
    },
  ];

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof IUserSpin
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = userSpins.map((n) => n.id + "");
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userSpins.length) : 0;

  const visibleRows: IUserSpin[] = useMemo(
    () =>
      stableSort<any>(userSpins, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, userSpins]
  );

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClickFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickDelete = async () => {
    if (selected.length > 0) {
      const response = await dispatchTookit(deleteUserSpins([...selected]));
      if (!!response) {
        setSelected([]);
        toast.success("Xóa thành công");
      } else {
        toast.error("Xóa thất bại");
      }
    }
  };

  const { control, handleSubmit, reset } = useForm<IFormInput>({
    mode: "onChange",
    defaultValues: {
      phone: "",
      channel: "",
      startAt: null,
      endAt: null,
    },
  });

  const keys = Object.keys(EChannel).filter((key) => key !== "toString");

  const onSubmitFilter: SubmitHandler<IFormInput> = async (data) => {
    let core = userSpinCores;
    if (!!data.phone) {
      core = core.filter((x) =>
        x.phone
          ?.trim()
          .toLocaleLowerCase()
          .includes(data.phone!.trim().toLocaleLowerCase())
      );
    }
    if (!!data.startAt) {
      core = core.filter((x) =>
        dayjs(x.createdAt + "", "YYYY-MM-DD").isSameOrAfter(
          dayjs(data.startAt, "YYYY-MM-DD")
        )
      );
    }

    if (!!data.endAt) {
      core = core.filter((x) =>
        dayjs(x.createdAt + "", "YYYY-MM-DD").isSameOrBefore(
          dayjs(data.endAt, "YYYY-MM-DD")
        )
      );
    }
    setUserSpins(core);
    handleClose();
  };

  const checkExpiredAt = (date: Date | string) => {
    return dayjs(date, "YYYY-MM-DD").isBefore(dayjs(new Date(), "YYYY-MM-DD"));
  };

  useEffect(() => {
    dispatchTookit(getUserSpins());
  }, []);

  useEffect(() => {
    setUserSpins(userSpinCores);
  }, [userSpinCores]);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            title="Danh sách Người quay thưởng"
            handleClickFilter={handleClickFilter}
            handleClickDelete={handleClickDelete}
          />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={userSpins.length}
                headCells={headCells}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.id + "");
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id + "")}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{
                        cursor: "pointer",
                        backgroundColor: checkExpiredAt(row.expiredAt + "")
                          ? "gainsboro"
                          : "unset",
                      }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.phone}
                      </TableCell>
                      <TableCell align="right">
                        {EChannel.toString(row.channel as EChannel)}
                      </TableCell>
                      <TableCell align="right">{row.segment}</TableCell>
                      <TableCell align="right">
                        {format(
                          new Date(row.createdAt + ""),
                          "dd/MM/yyyy, hh:mm:ss"
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {format(new Date(row.expiredAt + ""), "dd/MM/yyyy")}
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={userSpins.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        {/* <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        /> */}
      </Box>

      {/* <Dialog open={open} style={{ zIndex: 0 }}> */}
      <Paper sx={{ width: 320, maxWidth: "100%" }}>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuList>
            <MenuItem
              sx={{
                "&:hover": {
                  backgroundColor: "unset",
                },
              }}
            >
              <form
                onSubmit={handleSubmit(onSubmitFilter)}
                style={{ width: "100%" }}
              >
                <Box sx={{ my: 2 }}>
                  <Controller
                    control={control}
                    name={"phone"}
                    render={({ field, formState }) => (
                      <>
                        <TextField
                          fullWidth
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                          label="Số điện thoại"
                        ></TextField>
                      </>
                    )}
                  ></Controller>
                </Box>
                <Box sx={{ my: 2 }}>
                  <Controller
                    control={control}
                    name={"channel"}
                    render={({ field, formState }) => (
                      <>
                        <TextField
                          select
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                          fullWidth
                          label="Kênh thương mại"
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
                    name={"startAt"}
                    render={({ field, formState }) => (
                      <>
                        <DatePicker
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                          label="Từ ngày"
                        ></DatePicker>
                      </>
                    )}
                  ></Controller>
                </Box>
                <Box sx={{ my: 2 }}>
                  <Controller
                    control={control}
                    name={"endAt"}
                    render={({ field, formState }) => (
                      <>
                        <DatePicker
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                          label="Đến ngày"
                        ></DatePicker>
                      </>
                    )}
                  ></Controller>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                  <Button onClick={() => reset()} variant="outlined">
                    Reset
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white"
                  >
                    Tìm kiếm
                  </Button>
                </Box>
              </form>
            </MenuItem>
          </MenuList>
        </Menu>
      </Paper>
      {/* </Dialog> */}
    </>
  );
};

export default AdminUserSpinPage;
