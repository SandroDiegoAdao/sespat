import { useState } from 'react';
// @mui
import {
  Button,
  Checkbox,
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
  Typography,
} from '@mui/material';
// @types
import { Product } from 'src/@types/product';
// components
import { fDate, fTime } from 'src/utils/formatTime';
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import ConfirmDialog from '../../../../components/confirm-dialog';

// ----------------------------------------------------------------------

type Props = {
  row: Product;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function ProductTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const { nome, variacoes, createdAt = new Date(), updatedAt = new Date() } = row;

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

        <TableCell align="left">{nome}</TableCell>

        <TableCell align="center" sx={{ textTransform: 'capitalize' }}>
          {variacoes ? variacoes.map((variacao) => variacao.nome) : '-'}
        </TableCell>

        <TableCell align="left">
          <Typography variant="body2">{fDate(createdAt)}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {fTime(createdAt)}
          </Typography>
        </TableCell>

        <TableCell align="left">
          <Typography variant="body2">{fDate(updatedAt)}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {fTime(updatedAt)}
          </Typography>
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
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Editar
        </MenuItem>
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
