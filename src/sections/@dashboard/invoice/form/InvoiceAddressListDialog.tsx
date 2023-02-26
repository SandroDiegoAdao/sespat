import { useState } from 'react';
// @mui
import {
  Stack,
  Dialog,
  TextField,
  Typography,
  ListItemButton,
  InputAdornment,
} from '@mui/material';
// @types
import { IICenterCost } from '../../../../@types/invoice';
// components
import Iconify from '../../../../components/iconify';
import SearchNotFound from '../../../../components/search-not-found';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  selected: (selectedId: string) => boolean;
  onClose: VoidFunction;
  onSelect: (address: IICenterCost | null) => void;
  addressOptions: IICenterCost[];
};

export default function InvoiceAddressListDialog({
  open,
  selected,
  onClose,
  onSelect,
  addressOptions,
}: Props) {
  const [searchAddress, setSearchAddress] = useState('');

  const dataFiltered = applyFilter(addressOptions, searchAddress);

  const isNotFound = !dataFiltered.length && !!searchAddress;

  const handleSearchAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchAddress(event.target.value);
  };

  const handleSelectAddress = (address: IICenterCost | null) => {
    onSelect(address);
    setSearchAddress('');
    onClose();
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ pt: 2.5, px: 3 }}
      >
        <Typography variant="h6"> Centro de Custo </Typography>
      </Stack>

      <Stack sx={{ p: 2.5 }}>
        <TextField
          value={searchAddress}
          onChange={handleSearchAddress}
          placeholder="Procurar centro de custo..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {isNotFound ? (
        <SearchNotFound query={searchAddress} sx={{ px: 3, pt: 5, pb: 10 }} />
      ) : (
        <Stack sx={{ p: 1.5, pt: 0, maxHeight: 80 * 8, overflowX: 'hidden' }}>
          {dataFiltered.map((address) => (
            <ListItemButton
              key={address.code}
              selected={selected(address.code)}
              onClick={() => handleSelectAddress(address)}
              sx={{
                p: 1.5,
                borderRadius: 1,
                flexDirection: 'column',
                alignItems: 'flex-start',
                '&.Mui-selected': {
                  bgcolor: 'action.selected',
                  '&:hover': {
                    bgcolor: 'action.selected',
                  },
                },
              }}
            >
              <Typography variant="body2">{address.label}</Typography>
            </ListItemButton>
          ))}
        </Stack>
      )}
    </Dialog>
  );
}

// ----------------------------------------------------------------------

function applyFilter(array: IICenterCost[], query: string) {
  if (query) {
    return array.filter(
      (address) => address.label.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }

  return array;
}
