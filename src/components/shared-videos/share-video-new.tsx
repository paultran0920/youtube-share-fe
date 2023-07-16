import { LoadingButton } from "@mui/lab";
import { Grid, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { shareVideo } from "../../persistent/youtube-api";
import { BackButton } from "../shared/back-button";
import { CardType, CustomCard } from "../shared/custom-card";
import { BoxRow, StyledTextField, StyledTypography } from "../shared/styled-components";

export function ShareNewVideo() {
  const theme = useTheme();
  const [isSubmitting, setSubmitting] = useState(false)
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const shareVideoHandler = async () => {
    setSubmitting(true);
    await shareVideo(url);
    setSubmitting(false);
    navigate("/shared-videos");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        gap: theme.spacing(2),
      }}
    >
      <BoxRow sx={{ gap: theme.spacing(1) }}>
        <BackButton
          confirm={true}
          confirmContext={
            <>
              <p>Are you sure you want to leave?</p>
              <p>Unsaved changes will be lost.</p>
            </>
          }
        />
        <StyledTypography
          sx={{
            fontSize: '24px',
            fontWeight: 'bold',
          }}
        >
          Share New Video
        </StyledTypography>
      </BoxRow>

      <CustomCard
        color={CardType.Pink}
        key={"shared-videos"}
        header={
          <Box
            sx={{
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            New Video
          </Box>
        }
        sx={{
          fontSize: "12px",
        }}
      >
        <Box sx={{ flexGrow: 1, padding: theme.spacing(1) }}>
          <Grid container spacing={1} columnGap={theme.spacing(2)}>
            <StyledTextField
              id="youtube-url"
              placeholder="New Youtube Video URL"
              defaultValue={""}
              fullWidth
              onChange={(e) => setUrl(e.target.value)}
            />

            <LoadingButton
              onClick={shareVideoHandler}
              color="primary"
              loading={isSubmitting}
              loadingPosition="end"
              variant="contained"
              type="button"
              sx={{
                minWidth: "150px",
              }}
              disabled={isSubmitting}
            >
              Share
            </LoadingButton>
          </Grid>
        </Box>
      </CustomCard>
    </Box>
  );
}
