import { useMediaQuery } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UseMediaquery {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  isExtraLargeDesktop: boolean;
  is768x1024: boolean;
  is1114x705: boolean;
}

export function useMediaquery(): UseMediaquery {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const isTablet = useMediaQuery('(max-width: 768px)');
  const isDesktop = useMediaQuery('(max-width: 1024px)');
  const isLargeDesktop = useMediaQuery('(min-width: 1025px)');
  const isExtraLargeDesktop = useMediaQuery('(min-width: 1440px)');

  const is768x1024 = useMediaQuery(
    '(min-width: 768px) and (max-width: 1024px)'
  );
  const is1114x705 = useMediaQuery(
    '(min-width: 1114px) and (max-width: 705px)'
  );

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    isExtraLargeDesktop,
    is768x1024,
    is1114x705,
  };
}

export default useMediaquery;
