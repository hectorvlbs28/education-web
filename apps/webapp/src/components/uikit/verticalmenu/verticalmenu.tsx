import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import {
  IconButton,
  Popover,
  Box,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import SvgIcons from '../../../utils/iconsEnums';
import ItemVerticalMenu from '../../../interfaces/ItemVerticalMenu';

type Props = {
  rowType: string;
  items: readonly ItemVerticalMenu[];
};

const VerticalMenu = ({ rowType, items }: Props) => {
  return (
    <PopupState variant="popover" popupId={`popup-popover-${rowType}`}>
      {(popupState) => (
        <Box>
          <IconButton {...bindTrigger(popupState)}>
            <img
              src={SvgIcons.DotsThreeVerticalBlue}
              alt={`button-vertircal-menu-${rowType}-table`}
              style={{ width: '28px', height: '28px' }}
            />
          </IconButton>

          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <List
              component="nav"
              aria-labelledby="nested-list-subheader"
              sx={{
                width: '100%',
                bgcolor: 'background.paper',
                p: '2px 10px 2px 5px',
              }}
            >
              {items.map((item, index) => {
                return (
                  <ListItemButton key={index} onClick={item.handleAction}>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                );
              })}
            </List>
          </Popover>
        </Box>
      )}
    </PopupState>
  );
};

export default VerticalMenu;
