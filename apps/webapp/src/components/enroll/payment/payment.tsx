import { Box } from '@mui/material';
import { TEXT } from '../../../assets/globalcolors';
import Details from '../../payment/details/details';
import PaymentMethods from '../../payment/paymentmethods/paymentmethods';
import Typographies from '../../uikit/typographies/typographies';
import SendPaymentBody from '../../../interfaces/SendPaymentBody';
import { enumsTypographies, PaymentTypeEnum } from '../../../utils/enums';
import { setRequiresPaymentReceipt } from '../../../redux/slices/enroll';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../hooks/use-redux/use-redux';

const HEADERTEXT = [
  {
    label: 'Realizar pago de inscripción',
    type: enumsTypographies.headline2,
  },
  {
    label:
      'Continúa con tu proceso de inscripción realizando el pago del curso a continuación.',
    type: enumsTypographies.body1,
  },
];

type Props = {
  handleNext: () => void;
  handleSendPayment: (sendPaymentBody: SendPaymentBody) => void;
};

const Payment = ({ handleNext, handleSendPayment }: Props) => {
  const dispatch = useDispatch();
  const enrollPaymentId = useAppSelector(
    (state) => state.enrollSlice.paymentId
  );
  const contractId = useAppSelector((state) => state.enrollSlice.contractId);
  const price = useAppSelector((state) => state.enrollSlice.price);

  const handleClick = (isCase: boolean, paymentId: string) => {
    if (enrollPaymentId !== '') {
      handleNext();
      return;
    }

    dispatch(
      setRequiresPaymentReceipt({
        requiresPaymentReceipt: isCase,
        paymentId: paymentId,
      })
    );

    if (paymentId === '1') {
      const sendPaymentBody = {
        amount: price,
        currency: 'MXN',
        contractId: contractId,
        level: '0',
        type: PaymentTypeEnum.ANNUAL_REGISTRATION,
      };

      handleSendPayment(sendPaymentBody);
    } else {
      handleNext();
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 1,
      }}
    >
      {HEADERTEXT.map((text, index) => {
        return (
          <Typographies
            key={index}
            label={text.label}
            type={text.type}
            color={TEXT}
          />
        );
      })}

      <Details />

      <PaymentMethods handleClick={handleClick} />
    </Box>
  );
};

export default Payment;
