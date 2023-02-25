import { useState } from 'react';
// @mui
import {
  Stack,
  Button,
  Checkbox,
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
  Typography,
} from '@mui/material';
// @types
import { User } from '../../../../@types/user';
// components
import Label from '../../../../components/label';
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import ConfirmDialog from '../../../../components/confirm-dialog';
import { CustomAvatar } from '../../../../components/custom-avatar';

// ----------------------------------------------------------------------

type Props = {
  row: User;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function UserTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const { email, nomeCompleto, foto, unidade, cargo, supervisor, isSupervisor, situacao } = row;

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <CustomAvatar src={foto} alt={nomeCompleto} name={nomeCompleto} />

            <Stack>
              <Typography variant="subtitle2" noWrap>
                {nomeCompleto}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                {email}
              </Typography>
            </Stack>
          </Stack>
        </TableCell>

        <TableCell align="left">{supervisor || '-'}</TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {cargo}
        </TableCell>

        <TableCell align="left">{unidade || '-'}</TableCell>

        <TableCell align="center">
          <Iconify
            icon={isSupervisor ? 'eva:checkmark-circle-fill' : 'eva:close-circle-outline'}
            sx={{
              width: 20,
              height: 20,
              color: 'success.main',
              ...(!isSupervisor && { color: 'error.main' }),
            }}
          />
        </TableCell>

        <TableCell align="right">
          <Label
            variant="soft"
            color={(situacao === 'inativo' && 'error') || 'success'}
            sx={{ textTransform: 'capitalize' }}
          >
            {situacao || 'ativo'}
          </Label>
        </TableCell>

        <TableCell align="right">
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Deletar
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Editar
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Deletar usuário"
        content="Tem certeza que deseja deletar este usuário?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Deletar
          </Button>
        }
      />
    </>
  );
}
