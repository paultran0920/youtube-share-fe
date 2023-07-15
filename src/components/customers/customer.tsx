import { LoadingButton } from '@mui/lab';
import { useTheme } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppContext } from '../../context/app-context';
import { BaseCriteria } from '../../models/base-models';
import { CustomerDto } from '../../models/youtebe-models';
import {
  deleteCustomer,
  deleteCustomers,
  fetchCustomers,
} from '../../persistent/customer-api';
import {
  CustomTable,
  CustomTableCell,
  CustomTableRow,
} from '../shared/custom-table';
import { SeachBox } from '../shared/search-box';
import {
  BoxColumn,
  BoxRow,
  StyledTypography,
} from '../shared/styled-components';

export function Customer() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { contextData, setContextData } = useContext(AppContext);
  const [pageCount, setPageCount] = useState(1);
  const [customers, setCustomers] = useState<CustomerDto[]>();

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const searchCriteria = searchParams.get('filter') || '';

  const searchCustomer = async (
    newSearchCriteria?: string,
    newPage?: number
  ) => {
    const criteria = new BaseCriteria(
      newSearchCriteria || searchCriteria,
      newPage || page
    );
    const datas = await fetchCustomers(criteria);

    setCustomers(datas.items);
    setPageCount(datas.totalPage);
  };

  useEffect(() => {
    setContextData({
      ...contextData,
      waiting: true,
    });
    searchCustomer().finally(() => {
      setContextData({
        ...contextData,
        waiting: false,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchCriteria, page]);

  const onEdit = async (rowKey: string) => {
    navigate(`/customers/edit/${rowKey}`);
  };

  const onDelete = async (rowKey: string) => {
    setContextData({
      ...contextData,
      waiting: true,
    });
    try {
      await deleteCustomer(rowKey);
      await searchCustomer();
    } finally {
      setContextData({
        ...contextData,
        waiting: false,
      });
    }
  };

  const onDeleteAll = async (rowKeys: string[]) => {
    setContextData({
      ...contextData,
      waiting: true,
    });
    try {
      await deleteCustomers(rowKeys);
      await searchCustomer();
    } finally {
      setContextData({
        ...contextData,
        waiting: false,
      });
    }
  };

  const onAddNew = async () => {
    navigate('/customers/new');
  };

  const handlePageChange = async (newPage: number) => {
    if (page === newPage) {
      return;
    }
    setContextData({
      ...contextData,
      waiting: true,
    });
    try {
      searchParams.set('page', `${newPage}`);
      setSearchParams(searchParams);
    } finally {
      setContextData({
        ...contextData,
        waiting: false,
      });
    }
  };

  const handleSearchCriteriaChange = async (newSearchCriteria: string) => {
    if (searchCriteria === newSearchCriteria) {
      return;
    }
    setContextData({
      ...contextData,
      waiting: true,
    });
    try {
      searchParams.set('filter', newSearchCriteria);
      searchParams.set('page', '1');
      setSearchParams(searchParams);
    } finally {
      setContextData({
        ...contextData,
        waiting: false,
      });
    }
  };

  const genTableHeader = (): CustomTableCell[] => {
    return [
      '',
      'PIC',
      'Company',
      'PIC Email',
      'Contact Number',
      'Customer Type',
    ].map((item) => {
      return {
        render: () => <>{item}</>,
      };
    });
  };

  const genTableBody = (): CustomTableRow[] | undefined => {
    return customers?.map((item) => {
      return {
        key: item.id,
        items: [
          {
            render: () => <>{'Avatar'}</>,
          },
          {
            render: () => <>{item.PIC}</>,
          },
          {
            render: () => <>{item.companyName}</>,
          },
          {
            render: () => <>{item.POCEmail}</>,
          },
          {
            render: () => <>{item.PICContactNo}</>,
          },
          {
            render: () => <>{item.customerType}</>,
          },
        ],
      };
    });
  };

  const renderHeader = () => {
    return (
      <>
        <BoxColumn>
          <StyledTypography
            sx={{
              fontSize: '24px',
              fontWeight: 'bold',
            }}
          >
            My Customers
          </StyledTypography>
        </BoxColumn>
        <BoxColumn
          sx={{
            flex: 1,
            justifyContent: 'flex-end',
          }}
        >
          <BoxRow
            sx={{
              flex: 1,
              justifyContent: 'flex-end',
              gap: theme.spacing(1),
            }}
          >
            <LoadingButton
              color="primary"
              loading={false}
              loadingPosition="end"
              variant="contained"
              type="button"
              onClick={() => onAddNew()}
              sx={{
                minWidth: '200px',
                alignSelf: 'end',
              }}
            >
              Add Customer
            </LoadingButton>

            <SeachBox onChange={handleSearchCriteriaChange} />
          </BoxRow>
        </BoxColumn>
      </>
    );
  };

  return (
    <BoxColumn
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: '100%',
        gap: theme.spacing(4),
      }}
    >
      <BoxRow>{renderHeader()}</BoxRow>
      <BoxRow>
        <CustomTable
          color="pink"
          tableHeaders={genTableHeader()}
          tableRows={genTableBody() || []}
          isPaginationEnabled={true}
          page={page}
          pageCount={pageCount}
          handlePageChange={handlePageChange}
          onDeleteAll={onDeleteAll}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </BoxRow>
    </BoxColumn>
  );
}
