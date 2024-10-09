import { Typography } from '@mui/material';
import useMediaquery from '../../../hooks/use-mediaquery/use-mediaquery';
import { SxProps, Theme } from '@mui/system';
import { enumsTypographies } from '../../../utils/enums';
import { TEXT } from '../../../assets/globalcolors';

type Props = {
  label: string;
  type: keyof typeof enumsTypographies;
  color?: string;
  extraStyles?: SxProps<Theme>;
  align?: 'left' | 'center' | 'right';
};

const desktopSizes = {
  headline1: {
    weight: 600,
    size: '32px',
    lineHeight: '35.2px',
  },
  headline2: {
    weight: 600,
    size: '24px',
    lineHeight: '26.4px',
  },
  headline3: {
    weight: 600,
    size: '32px',
    lineHeight: '35.2px',
  },
  body1: {
    weight: 400,
    size: '16px',
    lineHeight: '24px',
  },
  body2: {
    weight: 700,
    size: '16px',
    lineHeight: '24px',
  },
  body3: {
    weight: 400,
    size: '14px',
    lineHeight: '19.6px',
  },
  body4: {
    weight: 400,
    size: '14px',
    lineHeight: '15.4px',
  },
  body5: {
    weight: 400,
    size: '12px',
    lineHeight: '14.4px',
  },
  body3Bold: {
    weight: 700,
    size: '14px',
    lineHeight: '19.6px',
  },
};

const tabletSizes = {
  headline1: {
    weight: 600,
    size: '32px',
    lineHeight: '35.2px',
  },
  headline2: {
    weight: 600,
    size: '24px',
    lineHeight: '26.4px',
  },
  headline3: {
    weight: 600,
    size: '16px',
    lineHeight: '19.2px',
  },
  body1: {
    weight: 400,
    size: '14px',
    lineHeight: '19.6px',
  },
  body2: {
    weight: 700,
    size: '14px',
    lineHeight: '19.6px',
  },
  body3: {
    weight: 400,
    size: '14px',
    lineHeight: '19.6px',
  },
  body4: {
    weight: 400,
    size: '12px',
    lineHeight: '13.2px',
  },
  body5: {
    weight: 400,
    size: '12px',
    lineHeight: '14.4px',
  },
  body3Bold: {
    weight: 700,
    size: '14px',
    lineHeight: '19.6px',
  },
};

const mobileSizes = {
  headline1: {
    weight: 600,
    size: '24px',
    lineHeight: '26.4px',
  },
  headline2: {
    weight: 600,
    size: '20px',
    lineHeight: '22px',
  },
  headline3: {
    weight: 600,
    size: '16px',
    lineHeight: '19.2px',
  },
  body1: {
    weight: 400,
    size: '14px',
    lineHeight: '19.6px',
  },
  body2: {
    weight: 700,
    size: '14px',
    lineHeight: '19.6px',
  },
  body3: {
    weight: 400,
    size: '14px',
    lineHeight: '19.6px',
  },
  body4: {
    weight: 400,
    size: '12px',
    lineHeight: '13.2px',
  },
  body5: {
    weight: 400,
    size: '12px',
    lineHeight: '14.4px',
  },
  body3Bold: {
    weight: 700,
    size: '14px',
    lineHeight: '19.6px',
  },
};

const Typographies = ({ label, type, color, extraStyles, align }: Props) => {
  const { isMobile, isTablet, isDesktop, isLargeDesktop, isExtraLargeDesktop } =
    useMediaquery();

  const getStyles = (type: keyof typeof enumsTypographies) => {
    if (isMobile) {
      return mobileSizes[type];
    } else if (isTablet) {
      return tabletSizes[type];
    } else if (isDesktop || isLargeDesktop || isExtraLargeDesktop) {
      return desktopSizes[type];
    } else {
      return desktopSizes[type];
    }
  };

  const styles = getStyles(type);

  return (
    <Typography
      align={align ? align : 'left'}
      sx={{
        ...extraStyles,
        fontWeight: styles.weight,
        fontSize: styles.size,
        lineHeight: styles.lineHeight,
        color: color ? color : TEXT,
        padding: 0,
      }}
    >
      {label}
    </Typography>
  );
};

export default Typographies;
