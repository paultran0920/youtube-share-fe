import AddIcon from '@mui/icons-material/Add';
import { IconButton, useTheme } from '@mui/material';
import { BoxRow, StyledTypography } from './styled-components';

export interface PlusButtonIconProps {
  color?: string;
  label: string;
  onClick: () => void;
}

export function PlusButtonIcon(props: PlusButtonIconProps) {
  const theme = useTheme();
  return (
    <BoxRow>
      <IconButton
        aria-label={`add ${props.label}`}
        onClick={props.onClick}
        size="small"
      >
        <AddIcon
          sx={{
            backgroundColor: theme.palette[props.color as any].main,
            color: theme.palette[props.color as any].contrastText,
            width: theme.spacing(2.5),
            height: theme.spacing(2.5),
          }}
        />
      </IconButton>
      <StyledTypography
        sx={{
          fontWeight: 500,
        }}
      >
        {props.label}
      </StyledTypography>
    </BoxRow>
  );
}
