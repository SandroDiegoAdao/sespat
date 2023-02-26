import { useState } from 'react';
// form
import { useFormContext } from 'react-hook-form';
// @mui
import { Stack, Divider, Typography, Button } from '@mui/material';
// hooks
import { useAuthContext } from 'src/auth/useAuthContext';
import { IICenterCost } from 'src/@types/invoice';
import useResponsive from '../../../../hooks/useResponsive';
// _mock
import { _costCenter } from '../../../../_mock/arrays';
// components
import Iconify from '../../../../components/iconify';
//
import InvoiceAddressListDialog from './InvoiceAddressListDialog';

// ----------------------------------------------------------------------

export default function InvoiceNewEditAddress() {
  const { user } = useAuthContext();

  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const upMd = useResponsive('up', 'md');

  const values = watch();

  const { costCenter } = values;

  const [openTo, setOpenTo] = useState(false);

  const handleOpenTo = () => {
    setOpenTo(true);
  };

  const handleCloseTo = () => {
    setOpenTo(false);
  };

  return (
    <Stack
      spacing={{ xs: 2, md: 5 }}
      direction={{ xs: 'column', md: 'row' }}
      divider={
        <Divider
          flexItem
          orientation={upMd ? 'vertical' : 'horizontal'}
          sx={{ borderStyle: 'dashed' }}
        />
      }
      sx={{ p: 3 }}
    >
      <Stack sx={{ width: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="h6" sx={{ color: 'text.disabled' }}>
            Solicitante:
          </Typography>
        </Stack>

        <AddressInfo name={user?.name} email={user?.email} />
      </Stack>

      <Stack sx={{ width: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="h6" sx={{ color: 'text.disabled' }}>
            Centro de Custo:
          </Typography>

          <Button
            size="small"
            startIcon={<Iconify icon={costCenter ? 'eva:edit-fill' : 'eva:plus-fill'} />}
            onClick={handleOpenTo}
          >
            {costCenter ? 'Alterar' : 'Adicionar'}
          </Button>

          <InvoiceAddressListDialog
            open={openTo}
            onClose={handleCloseTo}
            selected={(selectedId: string) => costCenter?.code === selectedId}
            onSelect={(address) => setValue('costCenter', address)}
            addressOptions={_costCenter}
          />
        </Stack>

        {costCenter ? (
          <CenterCostInfo code={costCenter.code} label={costCenter.label} />
        ) : (
          <Typography typography="caption" sx={{ color: 'error.main' }}>
            {(errors.invoiceTo as any)?.message}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}

// ----------------------------------------------------------------------

type AddressInfoProps = {
  name: string;
  email: string;
};

function AddressInfo({ name, email }: AddressInfoProps) {
  return (
    <>
      <Typography variant="subtitle2">{name}</Typography>
      <Typography variant="body2">{email}</Typography>
    </>
  );
}

// ----------------------------------------------------------------------

function CenterCostInfo({ code, label }: IICenterCost) {
  return <Typography variant="subtitle2">{`${code} - ${label}`}</Typography>;
}
