"use client";
import { useAppDispatch, useAppSelector } from "@/common/hook";
import { IHeadCell } from "@/common/models/IHeadCell";
import { deleteUserSpins } from "@/redux/slices/userSpinSlice";
import {
  Box,
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from "@mui/material";
import { ReactNode, useEffect, useMemo, useReducer, useState } from "react";
import React from "react";
import { getComparator, stableSort } from "@/common/table";
import { Order } from "@/type/order";
import { EnhancedTableHead } from "@/components/table/EnhancedTableHead";
import EnhancedTableToolbar from "@/components/table/EnhancedTableToolbar";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { toast } from "react-toastify";
import {
  createSegment,
  getSegments,
  updateSegment,
} from "@/redux/slices/segmentSlice";
import { ISegment } from "@/models/segment";
import { ETypeState, reducer } from "./reducer";
import DialogSegment from "./DialogSegment";
import EditIcon from "@mui/icons-material/Edit";
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const AdminUserSpinPage = () => {
  const segmentCores = useAppSelector((state) => state.segment.segments);
  const dispatchTookit = useAppDispatch();
  const [state, dispatch] = useReducer(reducer, {
    isOpen: false,
    segment: {},
  });

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof ISegment>("id");
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userSpins, setSegments] = useState([] as ISegment[]);

  const headCells: IHeadCell<ISegment>[] = [
    {
      id: "text",
      numeric: false,
      disablePadding: false,
      label: "Giá trị",
    },
    {
      id: "occurrence",
      numeric: true,
      disablePadding: false,
      label: "Số lần xuất hiện",
    },
    {
      id: "color",
      numeric: false,
      disablePadding: false,
      label: "Màu sắc",
    },
  ];
  const headMore: ReactNode = (
    <>
      <TableCell>Chỉnh sửa</TableCell>
    </>
  );

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof ISegment
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

  const visibleRows: ISegment[] = useMemo(
    () =>
      stableSort<any>(userSpins, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, userSpins]
  );

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    dispatch({ type: ETypeState.CHANGE_DIALOG, payload: false });
    dispatch({ type: ETypeState.CREATE_SEGMENT, payload: null });
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

  const handleClickAdd = () => {
    dispatch({ type: ETypeState.CHANGE_DIALOG, payload: true });
    dispatch({ type: ETypeState.CREATE_SEGMENT, payload: null });
  };
  const handleClickEdit = (payload: ISegment) => {
    dispatch({ type: ETypeState.CHANGE_DIALOG, payload: true });
    dispatch({ type: ETypeState.UPDATE_SEGMENT, payload: payload });
  };

  const handleSubmit = async (payload: ISegment) => {
    let res;
    if (!!payload.id) {
      res = await dispatchTookit(updateSegment(payload));
    } else {
      res = await dispatchTookit(createSegment(payload));
    }
    if (!!res) {
      handleClose();
      toast.success(`${!!payload.id ? "Sửa" : "Thêm"} thành công`);
    } else {
      toast.success(`${!!payload.id ? "Sửa" : "Thêm"} thất bại`);
    }
  };

  useEffect(() => {
    dispatchTookit(getSegments());
  }, []);

  useEffect(() => {
    setSegments(segmentCores);
  }, [segmentCores]);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            title="Danh sách voucher"
            handleClickDelete={handleClickDelete}
            handleClickAdd={handleClickAdd}
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
                headMore={headMore}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.id + "");
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell
                        padding="checkbox"
                        onClick={(event) => handleClick(event, row.id + "")}
                      >
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        onClick={(event) => handleClick(event, row.id + "")}
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.text}
                      </TableCell>
                      <TableCell
                        onClick={(event) => handleClick(event, row.id + "")}
                        align="right"
                      >
                        {row.occurrence}
                      </TableCell>
                      <TableCell
                        onClick={(event) => handleClick(event, row.id + "")}
                      >
                        {row.color}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => handleClickEdit(row)}>
                          <EditIcon></EditIcon>
                        </IconButton>
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
      </Box>
      <DialogSegment
        isOpen={state.isOpen}
        handleClose={handleClose}
        item={state.segment}
        handleSubmit={handleSubmit}
      ></DialogSegment>
    </>
  );
};

export default AdminUserSpinPage;
