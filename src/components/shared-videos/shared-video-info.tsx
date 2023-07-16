import { Grid, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { VideoInfoDto } from "../../models/youtebe-models";
import { StyledLink, StyledTypography } from "../shared/styled-components";

export interface VideoDetailInfoProps {
  videoInfo: VideoInfoDto;
}

export function VideoDetailInfo(props: VideoDetailInfoProps) {
  const theme = useTheme();
  const { videoInfo } = props;

  return (
    <Box sx={{ flexGrow: 1, padding: theme.spacing(1) }}>
      <Grid container spacing={1} rowGap={theme.spacing(2)}>
        <Grid item md={4} sm={12} alignSelf={"center"}>
          <Box
            sx={{
              minWidth: theme.spacing(10),
            }}
          >
            <StyledLink to={videoInfo.url} target={"_blank"}>
              <img
                src={videoInfo.thumbnailUrl}
                alt="Video Thumbnail"
                width={"100%"}
              />
            </StyledLink>
          </Box>
        </Grid>
        <Grid item md={8} sm={12}>
          <StyledLink to={videoInfo.url} target={"_blank"}>
            <StyledTypography
              sx={{
                fontSize: "24px",
                fontWeight: "600",
              }}
            >
              <strong>Title: </strong>
              {videoInfo.title}
            </StyledTypography>
          </StyledLink>
          <StyledTypography
            sx={{
              fontSize: "14px",
            }}
          >
            <strong>Desciption: </strong>
            {videoInfo.description}
          </StyledTypography>

          <StyledTypography
            sx={{
              fontSize: "14px",
            }}
          >
            <strong>Author: </strong>
            {videoInfo.owner}
          </StyledTypography>
        </Grid>
      </Grid>
    </Box>
  );
}
