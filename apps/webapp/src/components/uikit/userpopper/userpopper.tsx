import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import { Popper, Fade, Paper, Box, Grid, IconButton } from '@mui/material';
import SvgIcons from '../../../utils/iconsEnums';
import Typographies from '../typographies/typographies';
import UseMediaquery from '../../../hooks/use-mediaquery/use-mediaquery';
import UserAvatar from '../useravatar/useravatar';
import { enumsTypographies } from '../../../utils/enums';
import { useAppSelector } from '../../../hooks/use-redux/use-redux';

function UserPopper() {
  const { isMobile, isTablet } = UseMediaquery();
  const userName = useAppSelector((state) => state.userSlice.userName);

  const paperWidth = isMobile ? '220px' : isTablet ? '300px' : '400px';

  return (
    <PopupState variant="popper" popupId="user-info-popup-popper">
      {(popupState) => (
        <Box>
          <IconButton
            {...bindToggle(popupState)}
            sx={{
              p: 1,
            }}
          >
            <img src={SvgIcons.CaretDown} alt="User icon button" />
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
                  }}
                >
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="flex-start"
                    spacing={2}
                  >
                    <Grid item>
                      <UserAvatar displayPopper={false} label="" />
                    </Grid>

                    <Grid item>
                      <Typographies
                        label={userName}
                        type={enumsTypographies.body3Bold}
                      />
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
}

export default UserPopper;
