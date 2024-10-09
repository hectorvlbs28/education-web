import { Box } from '@mui/material';
import SvgIcons from '../../../utils/iconsEnums';
import Typographies from '../../uikit/typographies/typographies';
import { formatPrice } from '../../../utils/generalFunctions';
import { enumsTypographies } from '../../../utils/enums';
import { useAppSelector } from '../../../hooks/use-redux/use-redux';
import { TEXT, WHITE_BG, STROKE_GREY } from '../../../assets/globalcolors';

const commonBoxStyles = {
  width: '100%',
  border: `1px solid ${STROKE_GREY}`,
  display: 'flex',
  alignItems: 'center',
};

type PropsItem = {
  description: string;
  amount: string;
};

const Item = ({ description, amount }: PropsItem) => (
  <Box
    sx={{
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    }}
  >
    <Typographies
      label={description}
      type={enumsTypographies.body3}
      color={TEXT}
    />

    <Typographies label={amount} type={enumsTypographies.body3} color={TEXT} />
  </Box>
);

const Details = () => {
  const userName = useAppSelector((state) => state.userSlice.userName);
  const price = useAppSelector((state) => state.enrollSlice.price);

  return (
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
        label="Detalle de pago"
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
        <Box
          sx={{
            ...commonBoxStyles,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            gap: 2,
            padding: 2,
          }}
        >
          <img
            src={SvgIcons.UserIcon}
            alt="User"
            style={{ width: 36, height: 36, objectFit: 'contain' }}
          />

          <Box>
            <Typographies
              label="Nombre del alumno"
              type={enumsTypographies.body3}
              color={TEXT}
            />

            <Typographies
              label={userName}
              type={enumsTypographies.body3Bold}
              color={TEXT}
            />
          </Box>
        </Box>

        <Box
          sx={{
            ...commonBoxStyles,
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 2,
            padding: 2,
          }}
        >
          <Item
            description="Inscripción al Curso Diseño de Modas"
            amount={formatPrice(price)}
          />

          {/* <Item
            description="Descuento promocional (-10%)"
            amount="- $575.00 MXN"
          /> */}
        </Box>

        <Box
          sx={{
            ...commonBoxStyles,
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 2,
          }}
        >
          <Typographies
            label="Total a pagar"
            type={enumsTypographies.body2}
            color={TEXT}
          />

          <Typographies
            label={formatPrice(price)}
            type={enumsTypographies.body2}
            color={TEXT}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Details;
