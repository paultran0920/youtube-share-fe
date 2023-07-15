import { LoadingButton } from '@mui/lab';
import { Button, Grid, MenuItem, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { Formik, FormikErrors } from 'formik';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { CustomerDto, CustomerType } from '../../models/youtebe-models';
import { CardType, CustomCard } from '../shared/custom-card';
import {
  StyledSelect,
  StyledTextField,
  StyledTypography,
} from '../shared/styled-components';

interface FormProps extends Partial<CustomerDto> {}

export interface CustomerDetailsProps {
  isNew: boolean;
  customer?: CustomerDto;

  onSave: (customer: CustomerDto) => Promise<void>;
}

// See https://github.com/reactjs/reactjs.org/issues/2120#issuecomment-671129556
export const CustomerDetails = forwardRef(
  (props: CustomerDetailsProps, ref) => {
    const theme = useTheme();
    const [edit, setEdit] = useState(props.isNew);
    let _values;

    useImperativeHandle(ref, () => ({
      getCustomerInfo: () => {
        return _values;
      },
    }));

    const validateField = (values: FormProps): FormikErrors<FormProps> => {
      const errors: FormikErrors<FormProps> = {};
      // if (!values.POCName) {
      //   errors.POCName = 'The POCName is required';
      // }

      return errors;
    };

    const doSaveCustomerDetails = async (customer: FormProps) => {
      const newCustomer: any = {
        ...props.customer,
      };
      newCustomer.customerType = customer.customerType;
      newCustomer.companyName = customer.companyName;
      newCustomer.UENNo = customer.UENNo;
      newCustomer.POCName = customer.POCName;
      newCustomer.POCEmail = customer.POCEmail;
      newCustomer.POCContactNo = customer.POCContactNo;
      newCustomer.PIC = customer.PIC;
      newCustomer.PICContactNo = customer.PICContactNo;
      newCustomer.PICEmail = customer.PICEmail;
      newCustomer.customerRemarks = customer.customerRemarks;

      // Handled in the parent
      await props.onSave(newCustomer as any);
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
        key={props.customer + 'force-rerender-an-issue-of-forwardRef'}
        initialValues={{
          ...props.customer,
          customerType: props.customer?.customerType
            ? props.customer.customerType
            : CustomerType.Individual,
        }}
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
                key={'customer-details'}
                header={
                  <Box
                    sx={{
                      fontSize: '14px',
                      fontWeight: 500,
                    }}
                  >
                    Customer Details
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
                          <strong>Customer Type</strong>
                        </StyledTypography>
                      </Grid>
                      <Grid item sm={9} xs={12}>
                        <StyledSelect
                          id="customerType"
                          name="customerType"
                          value={values.customerType}
                          onChange={handleChange}
                          defaultValue={CustomerType.Individual}
                          fullWidth
                          disabled={!edit}
                        >
                          <MenuItem value={CustomerType.Individual}>
                            {CustomerType.Individual}
                          </MenuItem>
                          <MenuItem value={CustomerType.Corporate}>
                            {CustomerType.Corporate}
                          </MenuItem>
                          <MenuItem value={CustomerType.Contractor}>
                            {CustomerType.Contractor}
                          </MenuItem>
                        </StyledSelect>
                      </Grid>

                      <Grid item sm={3} xs={12} alignSelf={'center'}>
                        <StyledTypography>
                          <strong>Company Name</strong>
                        </StyledTypography>
                      </Grid>
                      <Grid item sm={9} xs={12}>
                        <StyledTextField
                          id="companyName"
                          placeholder="Company Name"
                          defaultValue={values.companyName}
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
                          <strong>UEN No.</strong>
                        </StyledTypography>
                      </Grid>
                      <Grid item sm={9} xs={12}>
                        <StyledTextField
                          id="UENNo"
                          placeholder="UEN No."
                          defaultValue={values.UENNo}
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
                          <strong>POC Name</strong>
                        </StyledTypography>
                      </Grid>
                      <Grid item sm={9} xs={12}>
                        <StyledTextField
                          id="POCName"
                          placeholder="POC Name"
                          defaultValue={values.POCName}
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
                          <strong>POC Email</strong>
                        </StyledTypography>
                      </Grid>
                      <Grid item sm={9} xs={12}>
                        <StyledTextField
                          id="POCEmail"
                          placeholder="POC Email"
                          defaultValue={values.POCEmail}
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
                          <strong>POC Contact No.</strong>
                        </StyledTypography>
                      </Grid>
                      <Grid item sm={9} xs={12}>
                        <StyledTextField
                          id="POCContactNo"
                          placeholder="POC Contact No."
                          defaultValue={values.POCContactNo}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          // error={!!(errors.name && touched.name)}
                          // required={true}
                          fullWidth
                          disabled={!edit}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      item
                      spacing={1}
                      rowGap={theme.spacing(2)}
                      lg={6}
                      sm={12}
                      sx={{
                        height: 'fit-content',
                      }}
                    >
                      <Grid item sm={3} xs={12} alignSelf={'center'}>
                        <StyledTypography>
                          <strong>PIC</strong>
                        </StyledTypography>
                      </Grid>
                      <Grid item sm={9} xs={12}>
                        <StyledTextField
                          id="PIC"
                          placeholder="PIC"
                          defaultValue={values.PIC}
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
                          <strong>PIC Email</strong>
                        </StyledTypography>
                      </Grid>
                      <Grid item sm={9} xs={12}>
                        <StyledTextField
                          id="PICEmail"
                          placeholder="PIC Email"
                          defaultValue={values.PICEmail}
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
                          <strong>PIC Contact No.</strong>
                        </StyledTypography>
                      </Grid>
                      <Grid item sm={9} xs={12}>
                        <StyledTextField
                          id="PICContactNo"
                          placeholder="PIC Contact No."
                          defaultValue={values.PICContactNo}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          // error={!!(errors.name && touched.name)}
                          // required={true}
                          fullWidth
                          disabled={!edit}
                        />
                      </Grid>
                    </Grid>

                    <Grid item xs={12} marginTop={theme.spacing(1)}>
                      <StyledTypography>
                        <strong>Customer Remarks</strong>
                      </StyledTypography>
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        id="customerRemarks"
                        placeholder="Enter Remarks here..."
                        multiline
                        maxRows={3}
                        minRows={3}
                        defaultValue={values.customerRemarks}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        // error={!!(errors.name && touched.name)}
                        // required={true}
                        fullWidth
                        disabled={!edit}
                        sx={{
                          maxWidth: '100%',
                        }}
                      />
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
  }
);
