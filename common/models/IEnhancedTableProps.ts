import { Order } from "@/type/order";
import { IHeadCell } from "./IHeadCell";

export interface IEnhancedTableProps<T> {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  headCells: IHeadCell<T>[];
}
