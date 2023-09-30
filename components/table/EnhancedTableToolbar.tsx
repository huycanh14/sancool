import { IEnhancedTableToolbarProps } from "@/common/models/IEnhancedTableToolbarProps";
import { Toolbar, alpha, Typography, Tooltip, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";

const EnhancedTableToolbar = (props: IEnhancedTableToolbarProps) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {props.title}
        </Typography>
      )}
      {props.handleClickAdd && (
        <Tooltip title="Add">
          <IconButton
            onClick={(e) => props.handleClickAdd && props.handleClickAdd(e)}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton
            onClick={(e) =>
              props.handleClickDelete && props.handleClickDelete(e)
            }
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          {props.handleClickFilter && (
            <Tooltip title="Filter list">
              <IconButton
                onClick={(e) =>
                  props.handleClickFilter && props.handleClickFilter(e)
                }
              >
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
        </>
      )}
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
