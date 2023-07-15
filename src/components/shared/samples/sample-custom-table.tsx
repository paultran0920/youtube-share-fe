import { useState } from 'react';
import { CardType, CustomCard } from '../custom-card';
import { CustomTable, CustomTableRow, CustomTableCell } from '../custom-table';

export function SampleCustomTable() {
  const [page, setPage] = useState(1);

  const renderTitle = () => {
    return <div>Test table</div>;
  };

  const genTableHeader = (): CustomTableCell[] => {
    return ['Name', 'Age', 'Address', ''].map((item) => {
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
    <CustomCard color={CardType.Pink} header={renderTitle()}>
      <CustomTable
        color="pink"
        tableHeaders={genTableHeader()}
        tableRows={genTableBody(5)}
        isPaginationEnabled={false}
        pageCount={10}
        handlePageChange={async (page: number) => setPage(page)}
        // onDeleteAll={async () => {}}
        // onEdit={async () => {}}
        // onDelete={async () => {}}
      />
    </CustomCard>
  );
}
