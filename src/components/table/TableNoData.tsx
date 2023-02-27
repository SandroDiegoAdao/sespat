// @mui
import { TableRow, TableCell } from '@mui/material';
//
import EmptyContent from '../empty-content';
import SearchNotFound from '../search-not-found';

// ----------------------------------------------------------------------

type Props = {
  isNotFound: boolean;
  isNotSearch: boolean;
  searchQuery?: string;
  type: string;
};

export default function TableNoData({ isNotFound, isNotSearch, searchQuery = '', type }: Props) {
  return (
    <>
      {isNotFound ? (
        <TableRow>
          <TableCell colSpan={9}>
            {!isNotSearch ? (
              <EmptyContent
                title="Não há dados!"
                description={`Não há ${type} cadastrados no momento.`}
                sx={{
                  '& span.MuiBox-root': { height: 160 },
                }}
              />
            ) : (
              <SearchNotFound
                searchQuery={searchQuery}
                sx={{
                  '& span.MuiBox-root': { height: 160 },
                }}
              />
            )}
          </TableCell>
        </TableRow>
      ) : (
        <TableRow>
          <TableCell colSpan={9} sx={{ p: 0 }} />
        </TableRow>
      )}
    </>
  );
}
