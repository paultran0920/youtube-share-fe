import {
  Box,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import { Link, NavLink } from 'react-router-dom';

export const StyledTypography = styled(Typography)(
  {
    fontFamily: 'Roboto',
  },
  (props: any) => ({
    color: props.color ? (props.color as string) : '#333333',
    fontSize: props.fontSize ? (props.fontSize as string) : '12px',
    fontWeight: props.fontWeight ? (props.fontWeight as string) : '400',
  })
);

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& input': {
    fontFamily: 'Roboto',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    fontSize: '12px',
  },

  '& textarea': {
    fontFamily: 'Roboto',
    fontSize: '12px',
  },

  fontFamily: 'Roboto',
  fontSize: '12px',
  maxWidth: '300px',
}));

export const StyledOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  '& input': {
    fontFamily: 'Roboto',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    fontSize: '12px',
  },

  '& textarea': {
    fontFamily: 'Roboto',
    fontSize: '12px',
  },

  fontFamily: 'Roboto',
  fontSize: '12px',
  maxWidth: '300px',
}));

export const StyledSelect = styled(Select)(({ theme }) => ({
  fontFamily: 'Roboto',
  fontSize: '12px',
  maxWidth: '300px',
  '& div': {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

export const StyledLink = styled(Link)(
  {
    textDecoration: 'none',
    color: 'inherit',
  },
  (props: any) => ({
    width: props.width ? (props.width as string) : undefined,
  })
);

export const StyledNavlink = styled(NavLink)({
  textDecoration: 'none',
  color: 'inherit',
  cursor: 'pointer',
});

export const StyledTextLink = styled(Typography)({
  cursor: 'pointer',
  fontFamily: 'Roboto',
  fontSize: '12px',
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline',
  },
});

export const BoxRow = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  alignItems: 'center',
});

export const BoxColumn = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  justifyContent: 'center',
});
