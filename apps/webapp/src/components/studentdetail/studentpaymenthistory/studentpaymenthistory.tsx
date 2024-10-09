import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Typographies from '../../../components/uikit/typographies/typographies';
import Main from '../../buttons/main/main';
import SvgIcons from '../../../utils/iconsEnums';
import HeadCell from '../../../interfaces/HeadCell';
import AdminTableRow from '../../../interfaces/AdminTableRow';
import AdminTable from '../../uikit/admintable/admintable';
import { enumsTypographies } from '../../../utils/enums';
import { TEXT_PRIMARY, WHITE_BG } from '../../../assets/globalcolors';

const headCells: readonly HeadCell[] = [
  {
    id: 'bill',
    label: 'Factura',
  },
  {
    id: 'paymentDate',
    label: 'Fecha de pago',
  },
  {
    id: 'description',
    label: 'Descripción',
  },
  {
    id: 'paymentMethod',
    label: 'Método de pago',
  },
  {
    id: 'total',
    label: 'Total',
  },
];

type Props = {
  isApplicant: boolean;
};

const StudentPaymentHistory = ({ isApplicant }: Props) => {
  const boxStyles = {
    width: '100%',
    display: 'flex',
    alignContent: 'center',
    gap: 2,
  };

  const handleDownload = () => {
    console.log('Download');
  };

  const [rows, setRows] = useState<AdminTableRow[]>([]);

  function createData(
    id: number,
    bill: string,
    paymentDate: string,
    description: string,
    paymentMethod: string,
    total: string
  ): AdminTableRow {
    return {
      id,
      bill,
      paymentDate,
      description,
      paymentMethod,
      total,
    };
  }

  useEffect(() => {
    const data = [
      createData(
        1,
        '001',
        'Jul 01, 2024',
        'Inscripción a Diseño de modas',
        '4242',
        '$ 5,500.00 MXN'
      ),
      createData(
        2,
        '001',
        'Jul 01, 2024',
        'Inscripción a Diseño de modas',
        '4242',
        '$ 5,500.00 MXN'
      ),
    ];

    setRows(data);
  }, []);

  return (
    <Box {...boxStyles} flexDirection="column" justifyContent="flex-start">
      <Box {...boxStyles} flexDirection="row" justifyContent="space-between">
        <Typographies
          label="Historial de pagos"
          type={enumsTypographies.body2}
          color={TEXT_PRIMARY}
        />

        <Box width="200px">
          <Main
            label="Descargar todo"
            isDisabled={false}
            onClick={handleDownload}
            bgColor={WHITE_BG}
            icon={SvgIcons.DownloadSimpleViolet}
          />
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: WHITE_BG,
          p: '30px 10px 0 10px',
        }}
      >
        <AdminTable
          tableTitle="Aspirantes-table"
          headCells={headCells}
          data={rows}
          rowType="PaymentHistory"
        />
      </Box>
    </Box>
  );
};

export default StudentPaymentHistory;
