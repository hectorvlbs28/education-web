import { RotatingLines } from 'react-loader-spinner';
import { Box, Avatar } from '@mui/material';
import Main from '../../../components/buttons/main/main';
import Typographies from '../../../components/uikit/typographies/typographies';
import SvgIcons from '../../../utils/iconsEnums';
import { enumsTypographies } from '../../../utils/enums';
import { TEXT, MAIN_VIOLET } from '../../../assets/globalcolors';

const LOADINGTEXT = [
  {
    label: 'Estamos generando tu contrato',
    type: enumsTypographies.headline2,
  },
  {
    label: 'Lo recibirás en tu correo electrónico',
    type: enumsTypographies.body1,
  },
];

const DONETEXT = [
  {
    label: 'Docusign te enviará un correo electrónico con tu contrato',
    type: enumsTypographies.headline2,
  },
  {
    label:
      'Hemos enviado el contrato vía Docusign. Revisa tu correo, confirma tus datos y sigue las instrucciones para firmar.',
    type: enumsTypographies.body1,
  },
];

type Props = {
  loadingContract: boolean;
  handleValidateContract: () => void;
};

const SignContract = ({ loadingContract, handleValidateContract }: Props) => {
  const handleNextAction = () => {
    handleValidateContract();
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1,
      }}
    >
      {loadingContract ? (
        <>
          <RotatingLines
            visible={true}
            width="34"
            strokeWidth="3"
            animationDuration="0.75"
            strokeColor={MAIN_VIOLET}
          />

          {LOADINGTEXT.map((text, index) => {
            return (
              <Typographies
                key={index}
                label={text.label}
                type={text.type}
                color={TEXT}
              />
            );
          })}
        </>
      ) : (
        <>
          <Avatar
            sx={{
              mt: 4,
            }}
          >
            <img src={SvgIcons.MailIcon} alt="mail icon" />
          </Avatar>

          {DONETEXT.map((text, index) => {
            return (
              <Typographies
                key={index}
                label={text.label}
                type={text.type}
                color={TEXT}
              />
            );
          })}

          <Main
            label="Continuar"
            isDisabled={false}
            onClick={handleNextAction}
          />
        </>
      )}
    </Box>
  );
};

export default SignContract;
