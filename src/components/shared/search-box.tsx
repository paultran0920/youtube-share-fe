import {
  InputAdornment,
  OutlinedInput,
  SxProps,
  Theme,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { debounce } from 'lodash';

export interface SeachBoxProps {
  id?: string;
  delay?: number;
  onChange: (value: string) => void;
  sx?: SxProps<Theme>;
}

export function SeachBox(props: SeachBoxProps) {
  const theme = useTheme();

  const onChange = debounce(props.onChange, props.delay || 300);

  return (
    <OutlinedInput
      id={props.id}
      type={'text'}
      onChange={(e) => onChange(e.target.value)}
      endAdornment={
        <InputAdornment position="end">
          <SearchIcon />
        </InputAdornment>
      }
      placeholder="Search"
      sx={{
        width: '200px',
        fontSize: '12px',
        '& input': {
          paddingTop: theme.spacing(1.2),
          paddingBottom: theme.spacing(1.2),
        },
        ...props.sx,
      }}
    />
  );
}
