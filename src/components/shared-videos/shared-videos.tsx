import { LoadingButton } from "@mui/lab";
import { Grid, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/app-context";
import { BaseCriteria } from "../../models/base-models";
import { VideoInfoDto } from "../../models/youtebe-models";
import { fetchSharedVideos } from "../../persistent/youtube-api";
import { CardType, CustomCard } from "../shared/custom-card";
import { StyledLink, StyledTypography } from "../shared/styled-components";
import { VideoDetailInfo } from "./shared-video-info";

export function SharedVideos() {
  const theme = useTheme();
  const { contextData, setContextData } = useContext(AppContext);
  const [videos, setVideos] = useState<VideoInfoDto[]>();

  const searchVideos = async (newSearchCriteria?: string, newPage?: number) => {
    const criteria = new BaseCriteria(newSearchCriteria, newPage, 100);
    const datas = await fetchSharedVideos(criteria);

    setVideos(datas.items);
  };

  useEffect(() => {
    setContextData({
      ...contextData,
      waiting: true,
    });
    searchVideos().finally(() => {
      setContextData({
        ...contextData,
        waiting: false,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        gap: theme.spacing(2),
      }}
    >
      <Box>
        <StyledTypography
          sx={{
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          Shared Videos
        </StyledTypography>
      </Box>

      <CustomCard
        color={CardType.Pink}
        key={"shared-videos"}
        header={
          <Box
            sx={{
              fontSize: "14px",
              fontWeight: 500,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <StyledTypography
              sx={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "inherit",
              }}
            >
              Videos
            </StyledTypography>
            <StyledLink
              to={"/shared-videos/share"}
              sx={{
                alignSelf: "flex-end",
                justifySelf: "flex-end",
              }}
            >
              <LoadingButton
                color="primary"
                variant="contained"
                type="submit"
                sx={{
                  minWidth: "50px",
                }}
              >
                Share New
              </LoadingButton>
            </StyledLink>
          </Box>
        }
        sx={{
          fontSize: "12px",
        }}
      >
        <Box sx={{ flexGrow: 1, padding: theme.spacing(1) }}>
          <Grid container spacing={1} rowGap={theme.spacing(2)}>
            {videos?.map((video) => (
              <VideoDetailInfo videoInfo={video} key={video.id} />
            ))}
          </Grid>
        </Box>
      </CustomCard>
    </Box>
  );
}
