import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../../context/app-context";
import { logError } from "../../logs/logger";
import {
  loadRememberMe,
  saveRememberMe,
} from "../../persistent/access-token-util";
import { fetchUserProfile } from "../../persistent/account-api";
import { login } from "../../persistent/authentication-api";
import { StyledNavlink, StyledTypography } from "../shared/styled-components";

const validateField = (values: any) => {
  const errors: any = {};
  if (!values.username) {
    errors.username = "UserName is required";
  }

  if (!values.password) {
    errors.password = "Password is required";
  }

  return errors;
};

export default function Login() {
  const { contextData, setContextData } = useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);

  const doLogin = async ({ username, password }) => {
    try {
      const accessToken = await login(username, password);
      if (!accessToken) {
        throw new Error("Failed to login!");
      }
      try {
        const user = await fetchUserProfile();
        if (user) {
          setContextData({
            ...contextData,
            currentUser: user,
          });
        }
      } catch (err) {
        if (err) {
          logError(err);
          setContextData({
            ...contextData,
            errorMessage: `Can not fetch user info for!`,
          });
        }
      }
    } catch (err) {
      if (err) {
        logError(err);
        setContextData({
          ...contextData,
          errorMessage: `The email or password is not correct!`,
        });
      }
    }
  };

  const handleRememberMe = (event: React.ChangeEvent<HTMLInputElement>) => {
    saveRememberMe(event.target.checked);
  };

  if (contextData.currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "250px",
          backgroundColor: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottomLeftRadius: "20px",
          borderBottomRightRadius: "20px",
          boxShadow: "0px 1px 10px grey",
        }}
      >
        <StyledTypography
          sx={{
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          Remitano Interview Round 2
        </StyledTypography>
      </Box>

      <Box
        sx={{
          flex: 1,
          paddingTop: "80px",
          width: "100vw",
        }}
      >
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validate={(values) => {
            const errors = validateField(values);
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            doLogin(values).then(() => {
              setSubmitting(false);
            });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "32px",
                }}
              >
                <FormControl
                  fullWidth
                  variant="outlined"
                  sx={{
                    maxWidth: "396px",
                  }}
                >
                  <TextField
                    id="username"
                    placeholder="Admin ID or Email"
                    defaultValue={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!(errors.username && touched.username)}
                    required={true}
                    fullWidth
                    sx={{
                      maxWidth: "396px",
                      boxShadow: "0px 2px 10px lightgrey",
                      backgroundColor: "#FFFFFF",
                    }}
                  />
                </FormControl>
                <FormControl
                  fullWidth
                  variant="outlined"
                  sx={{
                    maxWidth: "396px",
                  }}
                >
                  <OutlinedInput
                    id="password"
                    name="password"
                    error={!!(errors.password && touched.password)}
                    type={showPassword ? "text" : "password"}
                    defaultValue={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                    placeholder="Password"
                    required={true}
                    fullWidth
                    sx={{
                      maxWidth: "396px",
                      boxShadow: "0px 2px 10px lightgrey",
                      backgroundColor: "#FFFFFF",
                    }}
                  />
                </FormControl>

                <Box
                  sx={{
                    width: "100%",
                    maxWidth: "396px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "-24px",
                    fontSize: "14px",
                  }}
                >
                  <FormControlLabel
                    sx={{
                      "& span": {
                        fontSize: "inherit",
                      },
                    }}
                    control={
                      <Checkbox
                        defaultChecked={!!loadRememberMe()}
                        onChange={handleRememberMe}
                      />
                    }
                    label="Remember Me"
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "42px",
                    }}
                  >
                    <StyledNavlink
                      to="/forgot-password"
                      sx={{
                        "&:hover": {
                          textDecoration: "underline !important",
                        },
                      }}
                    >
                      Forgot Password?
                    </StyledNavlink>
                  </Box>
                </Box>
                <LoadingButton
                  size="large"
                  color="primary"
                  disabled={isSubmitting}
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    maxWidth: "300px",
                    height: "50px",
                  }}
                  loading={isSubmitting}
                  loadingPosition="start"
                >
                  <Typography
                    fontSize={"16px"}
                    fontFamily="Poppins"
                    fontWeight={500}
                  >
                    Login
                  </Typography>
                </LoadingButton>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
