import { useNavigate } from 'react-router-dom';
import { TableCell, TableRow } from '@mui/material';
import UserAvatar from '../../../../uikit/useravatar/useravatar';
import VerticalMenu from '../../../../uikit/verticalmenu/verticalmenu';
import ItemVerticalMenu from '../../../../../interfaces/ItemVerticalMenu';
import Paths from '../../../../../utils/paths';
import { getInitials } from '../../../../../utils/generalFunctions';

type Props = {
  rowType: string;
  name: string;
  selectedCourse: string;
  entryDate: string;
  lastActivity: string;
  studentStatus: string;
};

const AspiranteRow = ({
  rowType,
  name,
  selectedCourse,
  entryDate,
  lastActivity,
  studentStatus,
}: Props) => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleSendMessage = () => {
    console.log('send message');
  };

  const handleDelete = () => {
    console.log('delete');
  };

  const items: readonly ItemVerticalMenu[] = [
    {
      label: 'Ver detalle',
      handleAction: () => handleNavigate(Paths.Admin.ApplicantDetail),
    },
    {
      label: 'Enviar mensaje',
      handleAction: handleSendMessage,
    },
    {
      label: 'Eliminar',
      handleAction: handleDelete,
    },
  ];

  return (
    <TableRow hover>
      <TableCell
        component="th"
        align="left"
        padding="normal"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: 2,
        }}
      >
        <UserAvatar
          displayPopper={false}
          label={getInitials(name)}
          randomColor={true}
        />
        {name}
      </TableCell>

      <TableCell align="left" padding="normal">
        {selectedCourse}
      </TableCell>

      <TableCell align="left" padding="normal">
        {entryDate}
      </TableCell>

      <TableCell align="left" padding="normal">
        {lastActivity}
      </TableCell>

      <TableCell align="left" padding="normal">
        {studentStatus}
      </TableCell>

      <TableCell align="right" padding="normal">
        <VerticalMenu rowType={rowType} items={items} />
      </TableCell>
    </TableRow>
  );
};

export default AspiranteRow;
