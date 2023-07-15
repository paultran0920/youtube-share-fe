import { LoadingButton } from '@mui/lab';
import { useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { useContext, useState } from 'react';
import { AppContext } from '../../context/app-context';
import { logout } from '../../persistent/authentication-api';
import { BoxRow, StyledTypography } from '../shared/styled-components';
import { AccountInformation } from './account-information';

export function Settings() {
  const theme = useTheme();
  const { contextData } = useContext(AppContext);
  const [isLoggedOut, setLogoutState] = useState<boolean>(false);

  const onLogoutHandeller = async () => {
    setLogoutState(true);
    await logout();
    document.location.reload();
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
      <Box>
        <StyledTypography
          sx={{
            fontSize: '24px',
            fontWeight: 'bold',
          }}
        >
          Settings
        </StyledTypography>
      </Box>
      <AccountInformation
        account={contextData.currentUser!}
      />
      <BoxRow
        sx={{
          justifyContent: 'end',
        }}
      >
        <LoadingButton
          color="primary"
          loading={isLoggedOut}
          loadingPosition="end"
          variant="contained"
          type="button"
          sx={{
            minWidth: '150px',
          }}
          onClick={() => onLogoutHandeller()}
        >
          Logout
        </LoadingButton>
      </BoxRow>
    </Box>
  );
}
