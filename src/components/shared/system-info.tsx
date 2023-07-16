import { Backdrop, CircularProgress, Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/app-context';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props}  />;
});

export function SystemInfo() {
  const { contextData, setContextData } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState(false);

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
    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
      <Alert
        severity={contextData.message ? "success" : "error"}
        color={contextData.message ? "success" : "error"}
      >
          {contextData.errorMessage || contextData.message}
      </Alert>
    </Snackbar>
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
