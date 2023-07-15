import BackIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomDialog from './custom-dialog';

export interface BackButtonProps {
  confirm?: boolean;
  confirmContext?: React.ReactNode;
  onClick?: () => void;
}

export function BackButton(props: BackButtonProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton
        aria-label="back"
        onClick={() =>
          props.confirm
            ? setOpen(true)
            : (props.onClick && props.onClick()) || navigate(-1)
        }
        sx={{
          padding: 'unset',
        }}
      >
        <BackIcon fontSize="large" color={'black' as any} />
      </IconButton>

      <CustomDialog
        id={'confirmation-dialog'}
        open={open}
        title="Confirmation"
        onOK={async () => (props.onClick && props.onClick()) || navigate(-1)}
        onClose={async () => setOpen(false)}
        sx={{
          '& .MuiDialogContent-root': {
            minWidth: '400px',
            fontFamily: 'Poppins',
            textAlign: 'center',
            fontSize: '18px',
            fontWeight: 400,
          },
        }}
      >
        {props.confirmContext}
      </CustomDialog>
    </>
  );
}
