import { Box, Container, Typography, Link } from "@mui/material";
import Logo from "../Logo";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        MedCare
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Footer = () => {
  return (
    <>
      <Box component="footer" sx={{ py: 6 }}>
        <Container maxWidth="lg">
          <Box
            component={"div"}
            sx={{
              height: 22,
            }}
          >
            <Logo />
          </Box>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            Your Health, Your Schedule, Our Priority.{" "}
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </>
  );
};

export default Footer;
