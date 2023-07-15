import { Backdrop, CircularProgress, Snackbar } from '@mui/material';
import { useTheme, Theme } from '@mui/material/styles';
import { styled } from '@mui/system';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/app-context';
import { StyledTypography } from './styled-components';

const StledSnackbarMsg = styled('div')({
  width: '100%',
  height: '47px',
  borderRadius: '0px 0px 34.5px 34.5px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingLeft: '16px',
  paddingRight: '16px',
  textAlign: 'center',
});

const SnackbarWrapper = styled('div')(({ theme }) => ({
  width: '60%',
  top: '0px',
  left: '20%',
  position: 'fixed',
  zIndex: (theme as Theme).zIndex.snackbar,
  div: {
    width: '100%',
    top: '0px',
    position: 'relative',
  },
}));

export function SystemInfo() {
  const { contextData, setContextData } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    if (
      contextData.errorMessage ||
      contextData.message ||
      contextData.waiting
    ) {
      setOpen(true);
      setIsError(!!contextData.errorMessage);
    } else {
      setOpen(false);
    }
  }, [contextData.errorMessage, contextData.message, contextData.waiting]);

  const handleClose = () => {
    if (isError) {
      setContextData({
        ...contextData,
        errorMessage: undefined,
      });
    } else {
      setContextData({
        ...contextData,
        message: undefined,
      });
    }
  };

  return contextData.errorMessage || contextData.message ? (
    <SnackbarWrapper>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={100000}
        open={open}
        onClose={handleClose}
      >
        <StledSnackbarMsg
          sx={{
            backgroundColor: !!contextData.errorMessage
              ? theme.palette.error.main
              : theme.palette.success.main,
            color: !!contextData.errorMessage
              ? theme.palette.error.contrastText
              : theme.palette.success.contrastText,
          }}
        >
          {contextData.errorMessage ? (
            <StyledTypography fontWeight={400} color={'inherit'}>
              {contextData.errorMessage}
            </StyledTypography>
          ) : (
            <StyledTypography fontWeight={400} color={'inherit'}>
              {contextData.message}
            </StyledTypography>
          )}
        </StledSnackbarMsg>
      </Snackbar>
    </SnackbarWrapper>
  ) : contextData.waiting ? (
    <Backdrop
      sx={{
        color: (theme) => theme.palette.pink.main,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : null;
}
