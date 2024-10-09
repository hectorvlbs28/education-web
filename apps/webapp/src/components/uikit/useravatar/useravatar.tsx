import { Avatar, Stack } from '@mui/material';
import UseMediaquery from '../../../hooks/use-mediaquery/use-mediaquery';
import UserPopper from '../userpopper/userpopper';
import { useAppSelector } from '../../../hooks/use-redux/use-redux';
import {
  WHITE_BG,
  AVATAR_GREEN,
  AVATAR_VIOLET,
  AVATAR_GOLD,
  AVATAR_BLUE,
  AVATAR_PINK,
  AVATAR_ORANGE,
} from '../../../assets/globalcolors';

interface Props {
  displayPopper: boolean;
  label: string;
  randomColor?: boolean;
}

const UserAvatar = ({ displayPopper, label, randomColor }: Props) => {
  const { isMobile, isTablet } = UseMediaquery();
  const avatarColor = useAppSelector((state) => state.userSlice.avatarColor);

  const avatarSize = isMobile ? 38 : isTablet ? 42 : 46;
  let avatarBackgroundColor = AVATAR_GREEN;

  // si randomColor es true, se asigna un color aleatorio al avatar, de lo contrario se asigna el color del usuario
  if (randomColor) {
    switch (Math.floor(Math.random() * 6)) {
      case 0:
        avatarBackgroundColor = AVATAR_GREEN;
        break;
      case 1:
        avatarBackgroundColor = AVATAR_VIOLET;
        break;
      case 2:
        avatarBackgroundColor = AVATAR_GOLD;
        break;
      case 3:
        avatarBackgroundColor = AVATAR_BLUE;
        break;
      case 4:
        avatarBackgroundColor = AVATAR_PINK;
        break;
      case 5:
        avatarBackgroundColor = AVATAR_ORANGE;
        break;
    }
  } else {
    avatarBackgroundColor = avatarColor;
  }

  return (
    <Stack
      spacing="6px"
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Avatar
        sx={{
          p: 1,
          width: avatarSize,
          height: avatarSize,
          backgroundColor: avatarBackgroundColor,
          color: WHITE_BG,
        }}
      >
        {label}
      </Avatar>

      {displayPopper && <UserPopper />}
    </Stack>
  );
};

export default UserAvatar;
