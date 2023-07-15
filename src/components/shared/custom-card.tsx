import { Box, Theme } from '@mui/material';
import { styled, SxProps } from '@mui/system';

export enum CardType {
  Pink = 'pink',
  Grey = 'grey',
}

const CustomCardHeader = styled('div')(
  ({ theme }) => ({
    backgroundColor: theme.palette.pink.main,
    color: theme.palette.pink.contrastText,

    fontFamily: 'Roboto',
    fontSize: '12px',
    fontWeight: '500',

    width: 'calc(100% - 32px)',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',

    padding: '8px 16px',
  }),
  (props: any) => {
    const backgroundColor =
      !props.color || props.color === CardType.Pink
        ? props.theme.palette.pink.main
        : '#F4F4F4';
    const color =
      !props.color || props.color === CardType.Pink
        ? props.theme.palette.pink.contrastText
        : '#4F4F4F';
    return {
      backgroundColor: backgroundColor,
      color: color,
    };
  }
);

const CustomCardBody = styled('div')(({ theme }) => ({
  backgroundColor: '#FFFFFF',
  color: '#666666',
  width: 'calc(100% - 34px)',
  padding: '16px 16px',

  fontFamily: 'Roboto',
  fontSize: '12px',
  fontWeight: '500',

  border: '1px solid #D3D3D3',
  borderBottomLeftRadius: '8px',
  borderBottomRightRadius: '8px',
}));

export interface CustomCardProps {
  color: CardType;
  header: React.ReactNode;
  children?: React.ReactNode;

  sx?: SxProps<Theme>;
}

export function CustomCard(props: CustomCardProps) {
  return (
    <Box sx={props.sx}>
      <CustomCardHeader color={props.color}>{props.header}</CustomCardHeader>
      <CustomCardBody>{props.children}</CustomCardBody>
    </Box>
  );
}
