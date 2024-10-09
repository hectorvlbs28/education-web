import { TableCell, TableRow, IconButton, Stack } from '@mui/material';
import SvgIcons from '../../../../../utils/iconsEnums';

type Props = {
  bill: string;
  paymentDate: string;
  description: string;
  paymentMethod: string;
  total: string;
};

const PaymentHistoryRow = ({
  bill,
  paymentDate,
  description,
  paymentMethod,
  total,
}: Props) => {
  const handleDownload = () => {
    console.log('Download');
  };

  return (
    <TableRow hover>
      <TableCell component="th" align="left" padding="normal">
        {bill}
      </TableCell>

      <TableCell align="left" padding="normal">
        {paymentDate}
      </TableCell>

      <TableCell align="left" padding="normal">
        {description}
      </TableCell>

      <TableCell align="left" padding="normal">
        <Stack direction="row" spacing={1}>
          <img
            src={SvgIcons.VISA}
            alt="visa"
            style={{
              marginRight: '10px',
            }}
          />

          {paymentMethod}
        </Stack>
      </TableCell>

      <TableCell align="left" padding="normal">
        {total}
      </TableCell>

      <TableCell align="right" padding="normal">
        <IconButton onClick={handleDownload}>
          <img src={SvgIcons.DownloadSimpleViolet} alt="download" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default PaymentHistoryRow;
