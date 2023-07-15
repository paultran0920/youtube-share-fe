import { Button } from '@mui/material';
import { useState } from 'react';
import CustomDialog from '../custom-dialog';
import { CustomTable, CustomTableCell, CustomTableRow } from '../custom-table';

export function SampleCustomDialog() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);

  const genTableHeader = (): CustomTableCell[] => {
    return ['Name', 'Age', 'Address', 'balabla'].map((item) => {
      return {
        render: () => <>{!!item ? `${item}-${page}` : ''}</>,
      };
    });
  };

  const genTableBody = (count: number = 10): CustomTableRow[] => {
    return Array(count)
      .fill(1)
      .map((item, index) => {
        return {
          key: index,
          items: ['Hung Thien Ha', '10000', 'Heaven', 'Click Me'].map(
            (item) => {
              return {
                render: () => (
                  <>
                    {item}-{page}
                  </>
                ),
              };
            }
          ),
        };
      });
  };

  return (
    <>
      <Button
        color="primary"
        variant="contained"
        onClick={() => setOpen(!open)}
      >
        Open Table in a Dialog
      </Button>

      <CustomDialog
        id="dialog-1"
        open={open}
        title="Table in a Dialog"
        onClose={async () => setOpen(false)}
        onOK={async () => setOpen(false)}
      >
        <CustomTable
          color="pink"
          tableHeaders={genTableHeader()}
          tableRows={genTableBody(6)}
          isPaginationEnabled={false}
          pageCount={10}
          handlePageChange={async (page: number) => setPage(page)}
          onDeleteAll={async () => {}}
          onEdit={async () => {}}
          onDelete={async () => {}}
        />

        <CustomTable
          color="green"
          tableHeaders={genTableHeader()}
          tableRows={genTableBody(5)}
          isPaginationEnabled={false}
          pageCount={10}
          handlePageChange={async (page: number) => setPage(page)}
          // onRemoveSelectedItem={async () => {}}
        />
      </CustomDialog>
    </>
  );
}
