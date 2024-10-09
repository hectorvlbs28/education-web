import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Stack, Divider } from '@mui/material';
import Notifications from '../../notifications/notifications';
import UserAvatar from '../../useravatar/useravatar';
import UseMediaquery from '../../../../hooks/use-mediaquery/use-mediaquery';
import Searcher from '../../searcher/searcher';
import Paths from '../../../../utils/paths';

type Props = {
  title?: string;
};

const Header = (props: Props) => {
  const location = useLocation();
  const { isMobile, isTablet } = UseMediaquery();

  const [showSearcher, setShowSearcher] = useState(true);
  const stackSpacing = isMobile ? 1 : isTablet ? 2 : 2;

  useEffect(() => {
    setShowSearcher(location.pathname !== Paths.Admin.Home);
  }, [location]);

  return (
    <Box
      sx={{
        mb: 4,
        gap: 1,
        p: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      {showSearcher && <Searcher />}

      <Stack
        divider={<Divider orientation="vertical" flexItem />}
        spacing={stackSpacing}
        direction="row"
        sx={{
          mt: '10px',
        }}
      >
        <Notifications />

        <UserAvatar displayPopper={true} label="JV" />
      </Stack>
    </Box>
  );
};

export default Header;
