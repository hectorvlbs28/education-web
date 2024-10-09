import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import {
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  Toolbar,
} from '@mui/material';
import SvgIcons from '../../../utils/iconsEnums';
import MenuItemInterface from '../../../interfaces/MenuItemInterface';
import MenuItem from './menuitem/menuitem';
import Header from './header/header';
import UseMediaquery from '../../../hooks/use-mediaquery/use-mediaquery';
import { setHeaderSearchInput } from '../../../redux/slices/navigation';
import { useAppDispatch } from '../../../hooks/use-redux/use-redux';
import { MAIN_VIOLET } from '../../../assets/globalcolors';

type Props = {
  menu: MenuItemInterface[];
};

const LeftDrawer = ({ menu }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isTablet } = UseMediaquery();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const drawerWidth = isTablet ? 200 : 250;

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleNavigate = (path: string) => {
    dispatch(setHeaderSearchInput(''));
    navigate(path);
    handleDrawerClose();
  };

  const drawer = (
    <Box
      sx={{
        p: 1,
      }}
    >
      <Toolbar>
        <img src={SvgIcons.IfashionMX} alt="ifashionmx" />
      </Toolbar>

      <Divider
        sx={{
          borderColor: 'transparent',
        }}
      />

      <List>
        {menu.map((item, index) => (
          <MenuItem key={index} item={item} handleNavigate={handleNavigate} />
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          flexGrow: 1,
          p: {
            xs: '6px',
            sm: '0rem 4rem',
          },
        }}
      >
        <Box
          sx={{
            width: 'auto',
            height: 'auto',
            display: { sm: 'none' },
            mb: 1,
          }}
        >
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              p: 1,
            }}
          >
            <MenuIcon
              sx={{
                color: MAIN_VIOLET,
              }}
            />
          </IconButton>
        </Box>

        <Box>
          <Header />

          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default LeftDrawer;
