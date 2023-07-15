import {
  Box,
  Checkbox,
  IconButton,
  Pagination,
  Paper,
  styled,
  SxProps,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { BoxColumn } from './styled-components';
import DeleteIcon from '@mui/icons-material/DeleteSharp';
import EditIcon from '@mui/icons-material/EditSharp';
import { Theme } from '@mui/system';

const DEFAULT_COLOR = 'primary';

export interface CustomTableCell {
  // Delegate the rendering to itself
  render: () => React.ReactNode;
  // Delegate the click event to the itself
  onClick?: (e: React.MouseEvent) => void;
  // Any custom style if needed
  sx?: SxProps<Theme>;
}

export interface CustomTableRow {
  key: any;

  items: CustomTableCell[];
}

const StyledTableCell = styled(TableCell)(
  ({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(0.5),

      fontSize: 14,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }),
  (props: { theme: Theme; [key: string]: any }) => {
    const color = props.color || DEFAULT_COLOR;
    const style = {
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: props.theme.palette[color].main,
        color: props.theme.palette[color].contrastText,
      },
    };

    return style;
  }
);

export interface CustomTableProps {
  tableId?: string;

  // The self-rendering header cell items.
  tableHeaders: CustomTableCell[];
  // The self-rendering row cell items.
  tableRows: CustomTableRow[];
  // Color of this whole table.
  color?: string;

  // Display pagination section.
  isPaginationEnabled?: boolean;
  page?: number;
  pageCount?: number;
  handlePageChange?: (page: number) => Promise<void>;

  isCheckable?: boolean;
  onEdit?: (rowKey: string) => Promise<void>;
  onDelete?: (rowKey: string) => Promise<void>;
  onDeleteAll?: (rowKeys: string[]) => Promise<void>;

  sx?: SxProps<Theme>;
}

export function CustomTable(props: CustomTableProps) {
  const theme = useTheme();
  const isCheckable = props.isCheckable || !!props.onDeleteAll;
  const isRowActionEnabled = isCheckable || !!props.onDelete || !!props.onEdit;
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    setSelected([]);
  }, [props.tableRows]);

  const handlePageChange = async (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    await props.handlePageChange?.(value);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = props.tableRows.map((row) => row.key);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleRowSelected = (rowKey: string, checked: boolean) => {
    const selectedIndex = selected.indexOf(rowKey);
    let newSelected: string[] = [];

    if (checked) {
      newSelected = newSelected.concat(selected, rowKey);
    } else {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  return (
    <BoxColumn
      sx={{
        width: '100%',
        alignItems: 'center',
        gap: theme.spacing(1),

        ...props.sx,
      }}
    >
      <TableContainer
        key={props.tableId}
        component={Paper}
        sx={{
          borderRadius: '15px',
        }}
      >
        <Table>
          <TableHead color={props.color}>
            <TableRow>
              {isCheckable && (
                <StyledTableCell color={props.color}>
                  <Checkbox
                    color={props.color as any}
                    indeterminate={
                      selected.length > 0 &&
                      selected.length < props.tableRows.length
                    }
                    checked={
                      props.tableRows.length > 0 &&
                      selected.length === props.tableRows.length
                    }
                    onChange={handleSelectAllClick}
                    sx={{
                      color: `${
                        theme.palette[props.color || DEFAULT_COLOR].contrastText
                      } !important`,
                      padding: 'unset',
                      marginLeft: '-2px',
                    }}
                  />
                </StyledTableCell>
              )}
              {props.tableHeaders.map((headerItem) => {
                return (
                  <StyledTableCell color={props.color} sx={headerItem.sx}>
                    {headerItem.render()}
                  </StyledTableCell>
                );
              })}
              {isRowActionEnabled && (
                <StyledTableCell
                  color={props.color}
                  sx={{
                    textAlign: 'center',
                  }}
                >
                  {props.onDeleteAll && selected.length > 0 && (
                    <IconButton
                      aria-label="delete all selected"
                      size="large"
                      onClick={() => props.onDeleteAll?.(selected)}
                      color={props.color as any}
                      sx={{
                        color: `${
                          theme.palette[props.color || DEFAULT_COLOR]
                            .contrastText
                        } !important`,
                        padding: '0px',
                        border: '1px solid',
                        borderRadius: '5px',
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </StyledTableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {props.tableRows.map((row, index) => {
              const isItemSelected = selected.indexOf(row.key) !== -1;
              return (
                <TableRow key={`${row.key}-${index}`} hover>
                  {isCheckable && (
                    <StyledTableCell color={props.color} padding="checkbox">
                      <Checkbox
                        color={props.color as any}
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': `${row.key}-${index}`,
                        }}
                        onChange={(_event, checked) =>
                          handleRowSelected(row.key, checked)
                        }
                      />
                    </StyledTableCell>
                  )}

                  {row.items.map((item) => (
                    <StyledTableCell
                      color={props.color}
                      sx={item.sx}
                      onClick={item.onClick}
                    >
                      {item.render()}
                    </StyledTableCell>
                  ))}

                  {isRowActionEnabled && (
                    <StyledTableCell color={props.color}>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          gap: theme.spacing(1),
                        }}
                      >
                        {!!props.onEdit && (
                          <IconButton
                            aria-label="edit"
                            size="large"
                            onClick={() => props.onEdit?.(row.key)}
                            color={props.color as any}
                            sx={{
                              padding: '0px',
                              border: '1px solid',
                              borderRadius: '5px',
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        )}
                        {!!props.onDelete && (
                          <IconButton
                            aria-label="delete"
                            size="large"
                            onClick={() => props.onDelete?.(row.key)}
                            color={props.color as any}
                            sx={{
                              padding: '0px',
                              border: '1px solid',
                              borderRadius: '5px',
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </Box>
                    </StyledTableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {props.isPaginationEnabled ? (
        <Pagination
          page={props.page}
          count={props.pageCount}
          color={(props.color as any) || DEFAULT_COLOR}
          showFirstButton={true}
          showLastButton={true}
          onChange={handlePageChange}
          size={'small'}
        />
      ) : undefined}
    </BoxColumn>
  );
}
