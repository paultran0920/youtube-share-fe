import CloseIcon from '@mui/icons-material/Close';
import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled, SxProps, Theme } from '@mui/material/styles';
import * as React from 'react';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface DialogTitleProps {
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          color={'fourth' as any}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export interface CustomDialogProps {
  id: string;
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose?: () => Promise<void>;
  onOK?: () => Promise<void>;
  sx?: SxProps<Theme>;
}

export default function CustomDialog(props: CustomDialogProps) {
  const [loading, setLoading] = React.useState(false);

  const handleClose = async () => {
    setLoading(true);
    props.onClose && (await props.onClose());
    setLoading(false);
  };

  const handleOK = async () => {
    setLoading(true);
    props.onOK && (await props.onOK());
    setLoading(false);
  };

  const renderDialogActions = () => {
    if (!props.onOK && !props.onClose) {
      return undefined;
    }

    return (
      <DialogActions>
        {props.onClose && (
          <LoadingButton
            color="fourth"
            onClick={handleClose}
            loading={loading}
            loadingPosition="end"
            variant="outlined"
            sx={{
              minWidth: '100px',
            }}
          >
            Close
          </LoadingButton>
        )}
        {props.onOK && (
          <LoadingButton
            color="primary"
            onClick={handleOK}
            loading={loading}
            loadingPosition="end"
            variant="contained"
            sx={{
              minWidth: '100px',
            }}
          >
            OK
          </LoadingButton>
        )}
      </DialogActions>
    );
  };

  return (
    <BootstrapDialog
      id={props.id}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={props.open}
      maxWidth="xl"
      sx={props.sx}
    >
      <BootstrapDialogTitle onClose={handleClose}>
        {props.title}
      </BootstrapDialogTitle>

      <DialogContent dividers>{props.children}</DialogContent>

      {renderDialogActions()}
    </BootstrapDialog>
  );
}
