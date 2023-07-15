import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  OutlinedInput,
  OutlinedInputProps,
  useTheme,
} from '@mui/material';
import { useState } from 'react';

interface PasswordFieldProps extends OutlinedInputProps {
  helperText?: string;
  children?: React.ReactNode;
}

/**
 * Custom password field base on OutlinedInput component
 * @param props OutlinedInputProps | <new attribute>
 * @returns
 */
export function PasswordField(props: PasswordFieldProps) {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl fullWidth variant="outlined">
      <OutlinedInput
        id={props.id}
        name={props.name}
        error={props.error}
        type={showPassword ? 'text' : 'password'}
        defaultValue={props.defaultValue}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => {
                setShowPassword((showPassword) => !showPassword);
              }}
              edge="end"
            >
              {!showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        placeholder={props.placeholder}
        required={props.required}
        sx={{
          '& input': {
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
            fontFamily: 'Roboto',
            fontSize: '12px',
          },

          fontFamily: 'Roboto',
          fontSize: '12px',
          maxWidth: '300px',

          ...props.sx,
        }}
        disabled={props.disabled}
      />
      {props.children}
      {props.error && (
        <FormHelperText
          id={`${props.id}-helper-text`}
          sx={{
            color: theme.palette.error.main,
          }}
        >
          {props.helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}
