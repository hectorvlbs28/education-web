import React from 'react';
import EnrollmentForm from '../../../components/enrollment-form/EnrollmentForm';
import { Box, Button, Stack, Typography } from '@mui/material';
import SvgIcons from '../../../utils/iconsEnums';
import Secundary from '../../../components/buttons/secundary/secundary';

type Props = {};

const Home = (props: Props) => {
  return (
    <Stack>
      <EnrollmentForm />
      <Typography
        sx={{ fontWeight: '600', fontSize: '20px', lineHeight: '26px', mt: 5 }}
      >
        Mis cursos
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '30vh',
          position: 'relative',
          mb: 10
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            height: '160px',
            // position: 'relative',
            mb: 5,
          }}
        >
          {[...Array(4)].map((_, index) => (
            <Box
              key={index}
              sx={{
                flex: 1,
                mx: 1,
                bgcolor: 'rgba(246, 246, 246, 0.6)',
                borderRadius: '4px',
                background:
                  'linear-gradient(to bottom, rgba(245, 245, 245, 1), rgba(250, 250, 250, 0))',
              }}
            />
          ))}
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: '65%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img
            src={SvgIcons.Computer}
            alt="computer"
            style={{ width: '80px', height: '70px' }}
          />
          <Typography
            variant="h6"
            sx={{
              mb: 1,
              fontWeight: '600',
              fontSize: '20px',
              lineHeight: '26px',
            }}
          >
            Aún no tienes cursos activos
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 3,
              fontWeight: '400',
              fontSize: '14px',
              lineHeight: '26px',
            }}
          >
            Completa tu inscripción y comienza tu preparación en diseño de
            modas.
          </Typography>
          <Secundary label='Explorar oferta académica' onClick={() => {}}/>
        </Box>
      </Box>
    </Stack>
  );
};

export default Home;
