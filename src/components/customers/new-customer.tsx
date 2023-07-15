import { LoadingButton } from '@mui/lab';
import { Box, useTheme } from '@mui/material';
import { useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../context/app-context';
import { CustomerDto } from '../../models/youtebe-models';
import {
  addCustomer,
  fetchCustomer,
  updateCustomer,
} from '../../persistent/customer-api';
import { BackButton } from '../shared/back-button';
import { BoxRow, StyledTypography } from '../shared/styled-components';
import { BillAddress } from './bill-address';
import { CustomerDetails } from './customer-details';

export interface CustomerProps {}

export function NewCustomer(props: CustomerProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { contextData, setContextData } = useContext(AppContext);
  const [saving, setSaving] = useState(false);
  const customerDetailRef = useRef();
  const billAddressRef = useRef();

  // Case: creat new customer
  const isNew = location.pathname.split('/')[2] === 'new';
  // Case: update customer
  const { id: customerId } = useParams();

  const [customer, setCustomer] = useState<CustomerDto>();

  useEffect(() => {
    if (!isNew && customerId) {
      setContextData({
        ...contextData,
        waiting: true,
      });
      const fetchOnInit = async () => {
        const customer = await fetchCustomer(customerId);
        setCustomer(customer);
      };

      fetchOnInit().finally(() => {
        setContextData({
          ...contextData,
          waiting: false,
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerId]);

  const onCreateNewCustomer = async () => {
    setSaving(true);
    try {
      const customerDto = (
        customerDetailRef?.current as any
      )?.getCustomerInfo();

      // const billAddressDto = (billAddressRef?.current as any)?.getBillAddress();

      await addCustomer(customerDto);
      navigate('/customers');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        gap: theme.spacing(2),
      }}
    >
      <BoxRow sx={{ gap: theme.spacing(1) }}>
        <BackButton
          confirm={true}
          confirmContext={
            <>
              <p>Are you sure you want to leave?</p>
              <p>Unsaved changes will be lost.</p>
            </>
          }
        />
        <StyledTypography
          sx={{
            fontSize: '24px',
            fontWeight: 'bold',
          }}
        >
          {isNew ? 'Create New Customer' : 'Back'}
        </StyledTypography>
      </BoxRow>

      <CustomerDetails
        ref={customerDetailRef}
        isNew={isNew}
        customer={customer}
        onSave={async (dto: CustomerDto) => {
          return await updateCustomer(dto);
        }}
      />

      <BillAddress
        customer={customer}
        ref={billAddressRef}
        isNew={isNew}
        onSave={async (dto: CustomerDto) => {
          return await updateCustomer(dto);
        }}
      />

      {isNew && (
        <LoadingButton
          color="primary"
          loading={saving}
          loadingPosition="end"
          variant="contained"
          type="button"
          onClick={() => onCreateNewCustomer()}
          sx={{
            minWidth: '250px',
            alignSelf: 'end',
          }}
        >
          Create Customer
        </LoadingButton>
      )}
    </Box>
  );
}
