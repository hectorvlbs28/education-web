import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import { Popper, Fade, Paper, Box, Grid, IconButton } from '@mui/material';
import SvgIcons from '../../../utils/iconsEnums';
import Typographies from '../typographies/typographies';
import Hyperlink from '../../buttons/hyperlink/hyperlink';
import UseMediaquery from '../../../hooks/use-mediaquery/use-mediaquery';
import { enumsTypographies } from '../../../utils/enums';

type Props = {
  title?: string;
};

const Notifications = (props: Props) => {
  const { isMobile, isTablet } = UseMediaquery();

  const paperWidth = isMobile ? '320px' : isTablet ? '400px' : '500px';
  const iconSize = isMobile ? 26 : isTablet ? 28 : 30;

  return (
    <PopupState variant="popper" popupId="notifications-popup-popper">
      {(popupState) => (
        <Box>
          <IconButton
            {...bindToggle(popupState)}
            sx={{
              p: 1,
            }}
          >
            <img
              src={SvgIcons.Bell}
              alt="Notifications icon button"
              style={{
                width: iconSize,
                height: iconSize,
              }}
            />
          </IconButton>

          <Popper {...bindPopper(popupState)} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper
                  sx={{
                    width: paperWidth,
                    p: 2,
                    mr: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid red',
                  }}
                >
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Grid item>
                      <Typographies
                        label="Notificaciones"
                        type={enumsTypographies.body3Bold}
                      />
                    </Grid>

                    <Grid item>
                      <Hyperlink label="Marcar todas como leídas" />
                    </Grid>
                  </Grid>
                </Paper>
              </Fade>
            )}
          </Popper>
        </Box>
      )}
    </PopupState>
  );
};

export default Notifications;
