import { Box } from '@mui/material';
import Typographies from '../../../components/uikit/typographies/typographies';
import StudentDocItem from '../../../components/studentdetail/studentdocitem/studentdocitem';
import Main from '../../buttons/main/main';
import SvgIcons from '../../../utils/iconsEnums';
import { enumsTypographies } from '../../../utils/enums';
import { TEXT_PRIMARY, WHITE_BG } from '../../../assets/globalcolors';

interface ActionButtonProps {
  label: string;
  onClick: () => void;
  bgColor?: string;
  icon?: string;
}

const ActionButton = ({ label, onClick, bgColor, icon }: ActionButtonProps) => (
  <Box width="200px">
    <Main
      label={label}
      isDisabled={false}
      onClick={onClick}
      bgColor={bgColor}
      icon={icon}
    />
  </Box>
);

type Props = {
  isApplicant: boolean;
};

const StudentDocumentation = ({ isApplicant }: Props) => {
  const docItems = [0, 1, 2, 3].map((status) => (
    <StudentDocItem
      key={status}
      docStatus={status}
      label="Acta de nacimiento"
      fileName="acta-de-nacimiento-alexandra.pdf"
      isApplicant={isApplicant}
    />
  ));

  const boxStyles = {
    width: '100%',
    display: 'flex',
    alignContent: 'center',
    gap: 2,
  };

  const handleReject = () => {
    console.log('Reject');
  };

  const handleApprove = () => {
    console.log('Approve');
  };

  return (
    <Box {...boxStyles} flexDirection="column" justifyContent="flex-start">
      <Box {...boxStyles} flexDirection="row" justifyContent="space-between">
        <Typographies
          label="Documentación"
          type={enumsTypographies.body2}
          color={TEXT_PRIMARY}
        />

        {isApplicant && (
          <ActionButton
            label="Descargar"
            onClick={handleReject}
            bgColor={WHITE_BG}
            icon={SvgIcons.DownloadSimpleViolet}
          />
        )}
      </Box>

      <Box {...boxStyles} flexDirection="column" justifyContent="center">
        {docItems}
      </Box>

      <Box {...boxStyles} flexDirection="row" justifyContent="flex-end">
        {isApplicant ? (
          <>
            <ActionButton
              label="Rechazar aspirante"
              onClick={handleReject}
              bgColor={WHITE_BG}
            />

            <ActionButton label="Aprobar aspirante" onClick={handleApprove} />
          </>
        ) : (
          <ActionButton
            label="Bloquear"
            onClick={handleReject}
            bgColor={WHITE_BG}
            icon={SvgIcons.BlockViolet}
          />
        )}
      </Box>
    </Box>
  );
};

export default StudentDocumentation;
