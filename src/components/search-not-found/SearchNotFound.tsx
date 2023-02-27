// @mui
import { Box, BoxProps, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
//
import Image from 'src/components/image';

// ----------------------------------------------------------------------

const RootStyle = styled(Box)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  textAlign: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(8, 2),
}));

// ----------------------------------------------------------------------

interface SearchNotFoundProps extends BoxProps {
  searchQuery?: string;
  suffix?: string;
  img?: string;
  customText?: string;
}

export default function SearchNotFound({
  searchQuery = '',
  suffix = 'resultados',
  img,
  customText,
  ...other
}: SearchNotFoundProps) {
  return (
    <RootStyle {...other}>
      <Image
        disabledEffect
        visibleByDefault
        alt="empty search"
        src={img || '/assets/illustrations/illustration_empty_content.svg'}
        sx={{ height: 240, mb: 3 }}
      />

      <Typography variant="h5" gutterBottom>
        Nada encontrado!
      </Typography>

      {customText || (
        <>
          <Typography variant="body2" color="text.secondary">
            {`Não há ${suffix} para`}
            <Typography variant="subtitle2" component="span" color="text. primary">
              &nbsp;&quot;{searchQuery}&quot;
            </Typography>
            .
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Verifique se a pesquisa está correta ou utilize combinações para aprimorar sua pesquisa!
          </Typography>
        </>
      )}
    </RootStyle>
  );
}
