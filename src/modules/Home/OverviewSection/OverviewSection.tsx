import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Container, SvgIcon, Typography } from "@mui/material";
import { LocalPhone, AccessibilityNew, Favorite}  from '@mui/icons-material';

const itemsOverview = [
  {
    id: 1,
    title: "Book now",
    subtitle:
      "Seamlessly schedule your appointments online, anytime, anywhere. Enjoy instant access to manage your healthcare on your terms.",
    logo: <LocalPhone/>,
  },
  {
    id: 2,
    title: "Free Access",
    subtitle:
      "No subscriptions, just seamless healthcare at your fingertips for everyone.",
    logo: <AccessibilityNew/>,
  },
  {
    id: 3,
    title: " Made with Love",
    subtitle:
      "Every feature, meticulously crafted with a passion for improving your healthcare experience.",
    logo: <Favorite/>,
  },
];

const OverviewSection = () => {
  return (
    <Box component="div" sx={{ display: "flex", overflow: "hidden" }}>
      <Container sx={{ mt: 10, mb: 15, display: "flex", position: "relative" }}>
        <Box
          component="img"
          src="/assets/productCurvyLines.png"
          alt="curvy lines"
          sx={{ pointerEvents: "none", position: "absolute", top: -180 }}
        />
        <Grid container spacing={5} rowSpacing={1}>
          {itemsOverview.map(({ id, title, subtitle, logo }) => (
            <Grid item xs={12} md={4}>
              <Box component="div" sx={{ textAlign: "center" }} key={id}>
                <Box>
                  <SvgIcon fontSize="large">
                  {logo}
                  </SvgIcon>
                </Box>
                <Typography variant="h4" color="black" my={3}>
                  {title}
                </Typography>
                <Typography variant="subtitle1" color="neutral.600">
                {subtitle}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default OverviewSection;
