import { Box, Grid, useTheme } from "@mui/material";
import { CardType, CustomCard } from "./shared/custom-card";
import { StyledLink, StyledTypography } from "./shared/styled-components";

export function Dashboard() {
  const theme = useTheme();

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
          Youtube Video Sharing DEMO
        </StyledTypography>
      </Box>

      <CustomCard
        color={CardType.Pink}
        key={"dashboard"}
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
              Goto...
            </StyledTypography>
          </Box>
        }
        sx={{
          fontSize: "12px",
        }}
      >
        <Box sx={{ flexGrow: 1, padding: theme.spacing(1) }}>
          <Grid container spacing={1} rowGap={theme.spacing(2)}>
            <Box>
              <StyledLink to={"/shared-videos"}>
                <StyledTypography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "inherit",
                  }}
                >
                  List of Shared Videos
                </StyledTypography>
              </StyledLink>

              <StyledLink to={"/shared-videos/share"}>
                <StyledTypography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "inherit",
                  }}
                >
                  Create a new video sharing
                </StyledTypography>
              </StyledLink>
            </Box>
          </Grid>
        </Box>
      </CustomCard>
    </Box>
  );
}
