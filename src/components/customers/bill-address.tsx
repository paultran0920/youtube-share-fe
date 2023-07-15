import { LoadingButton } from '@mui/lab';
import { Button, Grid, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { Formik, FormikErrors } from 'formik';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { CustomerDto } from '../../models/youtebe-models';
import { CardType, CustomCard } from '../shared/custom-card';
import { StyledTextField, StyledTypography } from '../shared/styled-components';

interface FormProps extends CustomerDto {}

export interface BillAddressProps {
  isNew: boolean;
  customer?: CustomerDto;

  onSave: (customerDto: CustomerDto) => Promise<void>;
}

// See https://github.com/reactjs/reactjs.org/issues/2120#issuecomment-671129556
export const BillAddress = forwardRef((props: BillAddressProps, ref) => {
  const theme = useTheme();
  const [edit, setEdit] = useState(props.isNew);
  let _values = props.customer;

  useImperativeHandle(ref, () => ({
    getBillAddress: () => {
      return _values;
    },
  }));

  const validateField = (values: FormProps): FormikErrors<FormProps> => {
    const errors: FormikErrors<FormProps> = {};
    // if (!values.address1) {
    //   errors.address1 = 'The Address1 is required';
    // }

    return errors;
  };

  const doSaveCustomerDetails = async (customerDto: FormProps) => {
    const newCustomerDto: any = {
      ...props.customer,
    };
    newCustomerDto.address1 = customerDto.address1;
    newCustomerDto.address2 = customerDto.address2;
    newCustomerDto.postalCode = customerDto.postalCode;
    newCustomerDto.country = customerDto.country;
    newCustomerDto.city = customerDto.city;

    // Handled in the parent
    await props.onSave(newCustomerDto as any);
    setEdit(false);
  };

  const renderActionButtons = (isSubmitting: boolean) => {
    // View and Edit
    if (!props.isNew) {
      return (
        <Grid
          container
          item
          xs={12}
          justifyContent={'flex-end'}
          sx={{
            [theme.breakpoints.down('sm')]: {
              justifyContent: 'flex-start',
              marginTop: theme.spacing(1),
            },
            gap: theme.spacing(1),
          }}
        >
          {!edit ? (
            <Button
              color="primary"
              onClick={() => setEdit(true)}
              variant="outlined"
              sx={{
                minWidth: '150px',
              }}
            >
              Edit Details
            </Button>
          ) : (
            <>
              <Button
                color="fourth"
                onClick={() => setEdit(false)}
                variant="outlined"
                sx={{
                  minWidth: '150px',
                }}
              >
                Cancel
              </Button>

              <LoadingButton
                color="primary"
                loading={isSubmitting}
                loadingPosition="end"
                variant="contained"
                type="submit"
                sx={{
                  minWidth: '150px',
                }}
              >
                Save
              </LoadingButton>
            </>
          )}
        </Grid>
      );
    }
  };

  return (
    <Formik
      key={props.customer + 'force-rerender'}
      initialValues={
        {
          ...props.customer,
          country: props.customer?.country || 'Singapore',
          city: props.customer?.city || 'Singapore',
        } as FormProps
      }
      validate={(values) => {
        const errors = validateField(values);
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        doSaveCustomerDetails(values)
          .then(() => {
            setEdit(false);
          })
          .finally(() => {
            setSubmitting(false);
          });
      }}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
      }) => {
        _values = values; // Do not useState, as we just keep a copy outside of Formilk
        return (
          <form onSubmit={handleSubmit}>
            <CustomCard
              color={CardType.Pink}
              key={'bill-address'}
              header={
                <Box
                  sx={{
                    fontSize: '14px',
                    fontWeight: 500,
                  }}
                >
                  Bill Address
                </Box>
              }
              sx={{
                fontSize: '12px',
              }}
            >
              <Box sx={{ flexGrow: 1, padding: theme.spacing(1) }}>
                <Grid container spacing={1} columns={12}>
                  <Grid
                    container
                    item
                    spacing={1}
                    rowGap={theme.spacing(2)}
                    lg={6}
                    sm={12}
                  >
                    <Grid item sm={3} xs={12} alignSelf={'center'}>
                      <StyledTypography>
                        <strong>Address (Line 1)</strong>
                      </StyledTypography>
                    </Grid>
                    <Grid item sm={9} xs={12}>
                      <StyledTextField
                        id="address1"
                        placeholder="Address (Line 1)"
                        defaultValue={values.address1}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        // error={!!(errors.name && touched.name)}
                        // required={true}
                        fullWidth
                        disabled={!edit}
                      />
                    </Grid>

                    <Grid item sm={3} xs={12} alignSelf={'center'}>
                      <StyledTypography>
                        <strong>Address (Line 2)</strong>
                      </StyledTypography>
                    </Grid>
                    <Grid item sm={9} xs={12}>
                      <StyledTextField
                        id="address2"
                        placeholder="Address (Line 2)"
                        defaultValue={values.address2}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        // error={!!(errors.name && touched.name)}
                        // required={true}
                        fullWidth
                        disabled={!edit}
                      />
                    </Grid>

                    <Grid item sm={3} xs={12} alignSelf={'center'}>
                      <StyledTypography>
                        <strong>Postal Code</strong>
                      </StyledTypography>
                    </Grid>
                    <Grid item sm={9} xs={12}>
                      <StyledTextField
                        id="postalCode"
                        placeholder="Postal Code"
                        defaultValue={values.postalCode}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        // error={!!(errors.name && touched.name)}
                        // required={true}
                        fullWidth
                        disabled={!edit}
                      />
                    </Grid>

                    <Grid item sm={3} xs={12} alignSelf={'center'}>
                      <StyledTypography>
                        <strong>Country</strong>
                      </StyledTypography>
                    </Grid>
                    <Grid item sm={9} xs={12}>
                      <StyledTextField
                        id="country"
                        placeholder="Country"
                        defaultValue={values.country}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        // error={!!(errors.name && touched.name)}
                        // required={true}
                        fullWidth
                        disabled={!edit}
                      />
                    </Grid>

                    <Grid item sm={3} xs={12} alignSelf={'center'}>
                      <StyledTypography>
                        <strong>City</strong>
                      </StyledTypography>
                    </Grid>
                    <Grid item sm={9} xs={12}>
                      <StyledTextField
                        id="city"
                        placeholder="City"
                        defaultValue={values.city}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        // error={!!(errors.name && touched.name)}
                        // required={true}
                        fullWidth
                        disabled={!edit}
                      />
                    </Grid>
                  </Grid>
                  {renderActionButtons(isSubmitting)}
                </Grid>
              </Box>
            </CustomCard>
          </form>
        );
      }}
    </Formik>
  );
});
