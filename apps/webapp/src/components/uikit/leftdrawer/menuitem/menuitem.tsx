import { useState, useEffect } from 'react';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import MenuItemInterface from '../../../../interfaces/MenuItemInterface';
import { useLocation } from 'react-router-dom';
import { MAIN_VIOLET, TEXT } from '../../../../assets/globalcolors';

type Props = {
  item: MenuItemInterface;
  handleNavigate: (path: string) => void;
};

const MenuItem = ({ item, handleNavigate }: Props) => {
  const location = useLocation();
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    handleNavigate(item.path);
  };

  useEffect(() => {
    setSelected(location.pathname === item.path);
  }, [location.pathname, item.path]);

  return (
    <ListItem
      disablePadding
      sx={{
        borderRadius: '4px',
        mt: 1,
        mb: 1,
      }}
    >
      <ListItemButton
        selected={selected}
        onClick={handleClick}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <img src={selected ? item.activeIcon : item.icon} alt={item.label} />

        <ListItemText
          primary={item.label}
          sx={{
            color: selected ? MAIN_VIOLET : TEXT,
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default MenuItem;
