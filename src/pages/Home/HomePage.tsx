import { Helmet } from "react-helmet";
import { Box, Typography, Container, Button, Grid, Stack } from "@mui/material";

import Image from "/assets/images/main.png";
import FeedbackSection from "../../modules/Home/FeedbackSection";
import FrequentlyAskedQuestions from "../../modules/Home/FrequentlyAskedQuestions";
import OverviewSection from "../../modules/Home/OverviewSection";

const feedbacks = [
  {
    description:
      "I love how easy it is to book appointments using this app. The interface is intuitive, and I can schedule my medical appointments in just a few clicks. It has truly made managing my health a breeze!",
    author: "Vasile Popescu",
    rating: 5,
  },
  {
    description:
      "The app's reminder feature is a game-changer for me. I no longer miss appointments, thanks to the timely notifications. It has made my healthcare routine much more organized and stress-free.",
    author: "Mihai Constantinescu",
    rating: 3,
  },
  {
    description:
      "The app's user interface is so user-friendly that even someone like me, who isn't tech-savvy, can navigate it effortlessly. Kudos to the design team for making it accessible for everyone.",
    author: "Maria Zamfir",
    rating: 5,
  },
  {
    description:
      "Being able to review my past appointments easily is a great feature. It helps me keep track of my healthcare history, and the app's layout makes it simple to find the information I need. A valuable tool for managing my health.",
    author: "Ioana Cojocaru",
    rating: 2,
  },
];

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Box
        component="main"
        sx={{
          backgroundColor: "neutral.50",
        }}
      >
        <Box
          component={"div"}
          minHeight="60vh"
          width="100%"
          sx={{
            backgroundImage: `url(${Image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "grid",
            placeItems: "center",
            pt: 16,
          }}
        >
          <Container>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{ mx: "auto", textAlign: "center" }}
            >
              <Grid item lg={10}>
                <Typography variant="h2" color="white" align="center">
                  Simplify Your Health Journey
                </Typography>
              </Grid>
              <Grid item lg={8}>
                <Typography
                  variant="subtitle1"
                  color="white"
                  sx={{
                    placeItems: "center",
                    display: "grid",
                    mt: 1,
                    mb: 3,
                    opacity: 1,
                  }}
                >
                  Navigating appointments with ease, because your well-being
                  matters.
                </Typography>
                <Button variant="contained">Let's start!</Button>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box>
          <OverviewSection />
        </Box>
        <Box
          component={"div"}
          sx={{
            backgroundColor: "neutral.100",
            p: 14,
          }}
        >
          <Container maxWidth="lg">
            <FrequentlyAskedQuestions />
          </Container>
        </Box>
        <Box
          sx={{
            textAlign: "center",
            py: 4,
          }}
        >
          <Container>
            <Stack
              spacing={2}
              sx={{
                my: 10,
              }}
            >
              <Typography variant="h4" color="black">
                Embraced by users everywhere.
              </Typography>
              <Typography variant="subtitle1" color="neutral.600">
                Our platform is designed for love. It's so intuitive that users
                can't resist. Simplifying the experience by focusing on what
                truly matters – your feedback.
              </Typography>
            </Stack>
            <Grid container spacing={4}>
              {feedbacks.map((feedback) => (
                <Grid item xs={12} md={6}>
                  <FeedbackSection feedback={feedback} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
