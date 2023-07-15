import { LoadingButton } from '@mui/lab';
import { Button, Grid, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { Formik, FormikErrors } from 'formik';
import { useState } from 'react';
import { AccountDto } from '../../models/account-model';
import { CardType, CustomCard } from '../shared/custom-card';
import { StyledTextField, StyledTypography } from '../shared/styled-components';

interface FormProps extends AccountDto {
  name: string;
  contact: string;
  avatar?: string;
}

export interface AccountInformationProps {
  account: AccountDto;
}

export function AccountInformation(props: AccountInformationProps) {
  const theme = useTheme();
  const { account } = props;
  const [edit, setEdit] = useState(false);
  const [isUploading] = useState(false);

  const validateField = (values: FormProps): FormikErrors<FormProps> => {
    const errors: FormikErrors<FormProps> = {};
    if (!values.name) {
      errors.name = 'UserName is required';
    }

    if (!values.contact) {
      errors.contact = 'Contact is required';
    }

    return errors;
  };

  const doSaveAccountInformation = async (account: FormProps) => {
    const newAccount: AccountDto = {
      ...props.account,
    };
    newAccount.profile!.name = account.name;
    newAccount.profile!.contact = account.contact;
    newAccount.profile!.avatar = account.avatar;

    // Handled in the parent
    setEdit(false);
  };

  return (
    <Formik
      initialValues={
        {
          ...props.account,
          name: account.profile?.name,
          email: account.email,
          contact: account.profile?.contact,
          role: account.role,
        } as FormProps
      }
      validate={(values) => {
        const errors = validateField(values);
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        doSaveAccountInformation(values)
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
      }) => (
        <form onSubmit={handleSubmit}>
          <CustomCard
            color={CardType.Pink}
            key={'user-information'}
            header={
              <Box
                sx={{
                  fontSize: '14px',
                  fontWeight: 500,
                }}
              >
                User Account Information
              </Box>
            }
            sx={{
              fontSize: '12px',
            }}
          >
            <Box sx={{ flexGrow: 1, padding: theme.spacing(1) }}>
              <Grid container spacing={1} rowGap={theme.spacing(2)}>
                <Grid item sm={2} xs={12} alignSelf={'center'}>
                  <StyledTypography>
                    <strong>Name</strong>
                  </StyledTypography>
                </Grid>
                <Grid item sm={10} xs={12}>
                  <StyledTextField
                    id="name"
                    placeholder="User Name"
                    defaultValue={values.profile?.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!(errors.name && touched.name)}
                    required={true}
                    fullWidth
                    disabled={!edit}
                  />
                </Grid>

                <Grid item sm={2} xs={12} alignSelf={'center'}>
                  <StyledTypography>
                    <strong>Email</strong>
                  </StyledTypography>
                </Grid>
                <Grid item sm={10} xs={12}>
                  <StyledTextField
                    id="email"
                    placeholder="Email"
                    defaultValue={values.email}
                    fullWidth
                    disabled={true}
                  />
                </Grid>

                <Grid item sm={2} xs={12} alignSelf={'center'}>
                  <StyledTypography>
                    <strong>Contact</strong>
                  </StyledTypography>
                </Grid>
                <Grid item sm={10} xs={12}>
                  <StyledTextField
                    id="contact"
                    placeholder="Contact"
                    defaultValue={values.contact}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!(errors.contact && touched.contact)}
                    required={true}
                    fullWidth
                    disabled={!edit}
                  />
                </Grid>

                <Grid item md={2} sm={3} xs={12} alignSelf={'center'}>
                  <StyledTypography>
                    <strong>Profile Picture</strong>
                  </StyledTypography>
                </Grid>
                <Grid item md={10} sm={9} xs={12}>
                  <div />
                </Grid>

                <Grid item sm={2} xs={12} alignSelf={'center'}>
                  <StyledTypography>
                    <strong>Role</strong>
                  </StyledTypography>
                </Grid>
                <Grid item md={6} sm={10} xs={12}>
                  <StyledTextField
                    id="role"
                    placeholder="Role"
                    defaultValue={values.role}
                    fullWidth
                    disabled={true}
                  />
                </Grid>
                <Grid
                  item
                  md={!edit ? 4 : 4}
                  sm={!edit ? 6 : 6}
                  xl={!edit ? 12 : 12}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    [theme.breakpoints.up('md')]: {
                      justifyContent: 'flex-end',
                    },
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
                        disabled={isUploading}
                      >
                        Save
                      </LoadingButton>
                    </>
                  )}
                </Grid>
              </Grid>
            </Box>
          </CustomCard>
        </form>
      )}
    </Formik>
  );
}
