import * as React from 'react';
import { visuallyHidden } from '@mui/utils';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
} from '@mui/material';
import Typographies from '../../../components/uikit/typographies/typographies';
import HeadCell from '../../../interfaces/HeadCell';
import AdminTableRow from '../../../interfaces/AdminTableRow';
import AspiranteRow from './rows/aspiranterow/aspiranterow';
import AlumnoRow from './rows/alumnorow/alumnorow';
import PaymentHistoryRow from './rows/paymenthistoryrow/paymenthistoryrow';
import { enumsTypographies } from '../../../utils/enums';
import { ICON_TABLE_BLUE } from '../../../assets/globalcolors';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface EnhancedTableProps {
  order: Order;
  orderBy: string;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof AdminTableRow
  ) => void;
  headCells: readonly HeadCell[];
}

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const { order, orderBy, onRequestSort, headCells } = props;
  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property as keyof AdminTableRow);
    };

  return (
    <TableHead
      sx={{
        border: 'none',
        padding: 0,
        boxShadow: 'none',
      }}
    >
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding="none"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={true}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              sx={{
                mb: 2,
                '&.MuiTableSortLabel-root': {
                  '& .MuiTableSortLabel-icon': {
                    color: ICON_TABLE_BLUE,
                    fontSize: 'large',
                  },
                },
              }}
            >
              <Typographies
                label={headCell.label}
                type={enumsTypographies.body2}
                color={ICON_TABLE_BLUE}
              />

              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}

        <TableCell align="right" padding="none" />
      </TableRow>
    </TableHead>
  );
};

interface Props {
  tableTitle: string;
  headCells: readonly HeadCell[];
  data: any;
  rowType: string;
}

const AdminTable = ({ tableTitle, headCells, data, rowType }: Props) => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof AdminTableRow>('id');

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof AdminTableRow
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const visibleRows = React.useMemo(
    () => stableSort(data, getComparator(order, orderBy)),
    [data, order, orderBy]
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', border: 'none', boxShadow: 'none' }}>
        <TableContainer>
          <Table aria-labelledby={tableTitle} size="small">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              headCells={headCells}
            />

            <TableBody>
              {visibleRows.map((row, index) => {
                if (rowType === 'aspirante') {
                  return (
                    <AspiranteRow
                      key={row.id}
                      rowType={rowType}
                      name={row.name.toString()}
                      selectedCourse={row.selectedCourse.toString()}
                      entryDate={row.entryDate.toString()}
                      lastActivity={row.lastActivity.toString()}
                      studentStatus={row.studentStatus.toString()}
                    />
                  );
                } else if (rowType === 'alumno') {
                  return (
                    <AlumnoRow
                      key={row.id}
                      rowType={rowType}
                      name={row.name.toString()}
                      enrolledCourse={row.enrolledCourse.toString()}
                      courseGroup={row.courseGroup.toString()}
                      studentStatus={row.studentStatus.toString()}
                    />
                  );
                } else if (rowType === 'PaymentHistory') {
                  return (
                    <PaymentHistoryRow
                      key={row.id}
                      bill={row.bill.toString()}
                      paymentDate={row.paymentDate.toString()}
                      description={row.description.toString()}
                      paymentMethod={row.paymentMethod.toString()}
                      total={row.total.toString()}
                    />
                  );
                }
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default AdminTable;
