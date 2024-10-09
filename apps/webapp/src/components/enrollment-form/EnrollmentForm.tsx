import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
} from '@mui/material';
import StepperEnrollment from '../steppers/stepper/Stepper';
import ButtonMain from '../buttons/main/main';
import Secundary from '../buttons/secundary/secundary';
const steps = [
  'Tus datos',
  'Tu perfil',
  'Firmar contrato',
  'Realizar pago',
  'Documentación',
];

type Props = {};

const EnrollmentForm = (props: Props) => {
  return (
    <Card sx={{ display: 'flex', borderRadius: 2, overflow: 'hidden' }}>
      <Box sx={{ width: '5px', backgroundColor: '#8a33ff' }} />
      <Stack width="100%" spacing={2}>
        <Box sx={{ p: 3, width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              mb: 3,
            }}
          >
            <Box
              sx={{
                height: '57px',
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: '600', fontSize: '20px', lineHeight: '26px' }}
              >
                Tu inscripción está en proceso
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#0A121A',
                  fontWeight: '400',
                  fontSize: '14px',
                  lineHeight: '22px',
                }}
              >
                Completa los 5 pasos para acceder a tu primera clase.
              </Typography>
            </Box>
            <Box width="210px">
              <ButtonMain
                label="Completar inscripción"
                isDisabled={false}
                onClick={() => {}}
              />
            </Box>
          </Box>
          <StepperEnrollment steps={steps} />
        </Box>
        <Box>
          <CardContent
            sx={{ backgroundColor: '#f7f7f7', borderRadius: 2, width: '100%' }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontWeight: '600',
                fontSize: '16px',
                lineHeight: '22px',
              }}
            >
              Detalles del curso seleccionado
            </Typography>
            <Grid container spacing={15}>
              <Grid item xs={12} md={3}>
                <Typography
                  sx={{
                    fontWeight: '600',
                    fontSize: '14px',
                    lineHeight: '22px',
                  }}
                >
                  Nombre del curso
                </Typography>
                <Typography variant="body1">Diseño de Modas</Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography
                  sx={{
                    fontWeight: '600',
                    fontSize: '14px',
                    lineHeight: '22px',
                  }}
                >
                  <strong>Fecha de inicio</strong>
                </Typography>
                <Typography variant="body1">24 de agosto de 2024</Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography
                  sx={{
                    fontWeight: '600',
                    fontSize: '14px',
                    lineHeight: '22px',
                  }}
                >
                  <strong>Horario</strong>
                </Typography>
                <Typography variant="body1">Sábado de 9 a 14 hrs.</Typography>
              </Grid>
              <Grid item xs={12} md={3} display='flex' justifyContent='end'>
              <Secundary label='Más información' onClick={() => {}}/>          
              </Grid>
            </Grid>      
          </CardContent>
        </Box>
      </Stack>
    </Card>
  );
};

export default EnrollmentForm;
