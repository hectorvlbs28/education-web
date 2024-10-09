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
  enrolledCourse: string;
  courseGroup: string;
  studentStatus: string;
};

const AlumnoRow = ({
  rowType,
  name,
  enrolledCourse,
  courseGroup,
  studentStatus,
}: Props) => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleBlock = () => {
    console.log('block');
  };

  const handleDelete = () => {
    console.log('delete');
  };

  const items: readonly ItemVerticalMenu[] = [
    {
      label: 'Ver detalle',
      handleAction: () => handleNavigate(Paths.Admin.StudentDetail),
    },
    {
      label: 'Bloquear',
      handleAction: () => handleBlock,
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
        {enrolledCourse}
      </TableCell>

      <TableCell align="left" padding="normal">
        {courseGroup}
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

export default AlumnoRow;
