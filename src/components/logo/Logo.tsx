import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Link, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

const Logo = ({ disabledLink = false, sx }: LogoProps) => {
  const logo = (
    <Box
      component="img"
      src="/logo/logo.svg"
      sx={{
        width: 40,
        height: 40,
        cursor: 'pointer',
        ...sx,
      }}
    />
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} to="/" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
};

export default Logo;
