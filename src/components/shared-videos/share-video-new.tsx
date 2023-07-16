import { LoadingButton } from "@mui/lab";
import { Grid, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/app-context";
import { logError } from "../../logs/logger";
import { shareVideo } from "../../persistent/youtube-api";
import { notifyNewSharedVideo } from "../../utils/common";
import { BackButton } from "../shared/back-button";
import { CardType, CustomCard } from "../shared/custom-card";
import {
  BoxRow,
  StyledTextField,
  StyledTypography,
} from "../shared/styled-components";

export function ShareNewVideo() {
  const { contextData, setContextData } = useContext(AppContext);
  const theme = useTheme();
  const [isSubmitting, setSubmitting] = useState(false);
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const shareVideoHandler = async () => {
    setSubmitting(true);
    try {
      const videoInfo = await shareVideo(url);
      await notifyNewSharedVideo({
        id: videoInfo.id,
        videoUrl: videoInfo.url,
        videoTitle: videoInfo.title,
        thumbnailUrl: videoInfo.thumbnailUrl,
        sharedUser: contextData.currentUser!.profile.name,
      })
      navigate("/shared-videos");
    } catch (error: any) {
      if (error) {
        logError(error);
        setContextData({
          ...contextData,
          errorMessage: `Can not share new video URL!`,
        });
      }
    } finally {
      setSubmitting(false);
    }
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
            fontSize: "24px",
            fontWeight: "bold",
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
          <Grid
            container
            spacing={1}
            columnGap={theme.spacing(2)}
            rowGap={theme.spacing(2)}
          >
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
