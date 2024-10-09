import { useState, useEffect } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Button } from '@mui/material';
import SvgIcons from '../../../utils/iconsEnums';
import Typographies from '../../uikit/typographies/typographies';
import { useAppSelector } from '../../../hooks/use-redux/use-redux';
import { enumsTypographies } from '../../../utils/enums';
import {
  TEXT,
  WHITE_BG,
  STROKE_GREY,
  TEXT_GRAY,
  BG_GRAY_237,
  MAIN_VIOLET,
} from '../../../assets/globalcolors';

const commonBoxStyles = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
};

const paymentMethods = [
  {
    icon: SvgIcons.PM1,
    title: 'Pago seguro en línea',
    description: 'Paga con tarjeta de crédito ó debito',
    requiresPaymentReceipt: false,
    id: '1',
  },
  {
    icon: SvgIcons.PM2,
    title: 'Transferencia interbancaria',
    description: '0% comisión',
    requiresPaymentReceipt: true,
    id: '2',
  },
  {
    icon: SvgIcons.PM3,
    title: 'Realizar depósito en ventanilla',
    description: 'Realice el pago antes de 72 horas',
    requiresPaymentReceipt: true,
    id: '3',
  },
];

type PropsOption = {
  icon: string;
  title: string;
  description: string;
  requiresPaymentReceipt: boolean;
  id: string;
  handleClick: (isCase: boolean, paymentId: string) => void;
};

const PaymentOption = ({
  icon,
  title,
  description,
  requiresPaymentReceipt,
  id,
  handleClick,
}: PropsOption) => {
  const enrollPaymentId = useAppSelector(
    (state) => state.enrollSlice.paymentId
  );

  const [isHovered, setIsHovered] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isActived, setIsActived] = useState(false);

  const handleLocalClick = (isCase: boolean, paymentId: string) => () => {
    handleClick(isCase, paymentId);
  };

  useEffect(() => {
    if (enrollPaymentId !== '') {
      setIsDisabled(enrollPaymentId !== id);
      setIsActived(enrollPaymentId === id);
    }
  }, [enrollPaymentId, id]);

  return (
    <Button
      onClick={handleLocalClick(requiresPaymentReceipt, id)}
      disabled={isDisabled}
      variant="outlined"
      sx={{
        padding: 0,
        width: '100%',
        border: `1px solid ${isActived ? MAIN_VIOLET : STROKE_GREY}`,

        '&:hover': {
          border: `1px solid ${MAIN_VIOLET}`,
          backgroundColor: WHITE_BG,
        },

        '&:active': {
          backgroundColor: MAIN_VIOLET,
        },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box
        sx={{
          ...commonBoxStyles,
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 2,
          padding: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <img
            src={icon}
            alt="Payment Method"
            style={{ width: 36, height: 36, objectFit: 'contain' }}
          />

          <Box>
            <Typographies
              label={title}
              type={enumsTypographies.body3}
              color={TEXT}
            />

            <Typographies
              label={description}
              type={enumsTypographies.body3}
              color={TEXT}
            />
          </Box>
        </Box>

        {isHovered && (
          <ArrowForwardIcon
            sx={{
              color: MAIN_VIOLET,
              fontSize: 22,
            }}
          />
        )}
      </Box>
    </Button>
  );
};

interface Props {
  handleClick: (isCase: boolean, paymentId: string) => void;
}

const PaymentMethods = ({ handleClick }: Props) => (
  <Box
    sx={{
      mt: 2,
      gap: 2,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Typographies
      label="Elige una forma de pago"
      type={enumsTypographies.body2}
      color={TEXT}
    />

    <Box
      sx={{
        ...commonBoxStyles,
        backgroundColor: WHITE_BG,
        flexDirection: 'column',
      }}
    >
      {paymentMethods.map((method, index) => (
        <PaymentOption key={index} {...method} handleClick={handleClick} />
      ))}

      <Box
        sx={{
          ...commonBoxStyles,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: 1,
          padding: 2,
        }}
      >
        <Typographies
          label="Cuenta para transferir y depositar"
          type={enumsTypographies.body3Bold}
          color={TEXT}
        />

        <Typographies
          label="iFashion Mx"
          type={enumsTypographies.body3}
          color={TEXT_GRAY}
        />

        <Typographies
          label="Banco Banorte"
          type={enumsTypographies.body3Bold}
          color={TEXT}
        />

        <Typographies
          label="CLABE: 5542 2568 2387 1167 44"
          type={enumsTypographies.body3}
          color={TEXT_GRAY}
        />
      </Box>

      <Box
        sx={{
          ...commonBoxStyles,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
          padding: 2,
          border: 'none',
          backgroundColor: BG_GRAY_237,
        }}
      >
        <Typographies
          label="Conserva tu comprobante de pago."
          type={enumsTypographies.body3}
          color={TEXT}
        />
      </Box>
    </Box>
  </Box>
);

export default PaymentMethods;
