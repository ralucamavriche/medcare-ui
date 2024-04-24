import {
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  SvgIcon,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { PeopleAlt, ExitToApp } from "@mui/icons-material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../Logo";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  width: "96%",
  margin: "auto",
  borderRadius: "25px",
  boxShadow: theme.shadows[5],
  padding: "8px 24px",
  background: "white",
  [theme.breakpoints.up("lg")]: {
    width: "70%",
    py: 1,
    px: 4,
  },
}));

const RenderLogo = () => (
  <Box
    component={"div"}
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Box
      component={"div"}
      sx={{
        width: 32,
        height: 32,
      }}
    >
      <Logo />
    </Box>
    <Box
      component={"div"}
      sx={{
        letterSpacing: 0.3,
        lineHeight: 2.5,
        ml: 1,
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontWeight: 700,
        }}
      >
        MedCare
      </Typography>
    </Box>
  </Box>
);

const LOGGEDIN_ROUTES = [{
  to: '/dashboard',
  label: 'Dashboard'
}, {
  to: '/dashboard/appointment',
  label: 'Appointment'
}, {
  to: '/contact',
  label: 'Contact'
}, {
  to: '/Details',
  label: 'Details'
}]

const Header = () => {
  const { user,removeUser } = useAuth()
  const [showDrawer, setShowDrawer] = useState(false);
  const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));

  const isLoggedIn = !!user

  const generateLoggedInRoutes = () => {
    if (!isLoggedIn) {
      return null
    }

    return LOGGEDIN_ROUTES.map(({ to, label }) => (<Link to={to}>
      <Button sx={{ color: "neutral.600" }}>{label}</Button>
    </Link>))
  }

  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        width: "100%",
        margin: "auto",
        borderRadius: "25px",
        left: 0,
        position: "fixed",
        pt: 2,
        top: 0,
        zIndex: 1500,
      }}
    >
      <Container>
        <Box
          component={Link}
          to="/"
          sx={{
            display: "inline-flex",
            textDecoration: "none",
          }}
        >
          <RenderLogo />
        </Box>
        {!lgDown && (
          <>
            <Box
              component={"div"}
              sx={{
                display: "flex",
              }}
            >
              <Stack alignItems="center" direction="row" spacing={1}>
                {generateLoggedInRoutes()}
              </Stack>
            </Box>
            <Box
              component={"div"}
              sx={{
                display: "flex",
              }}
            >
              <Stack alignItems="center" direction="row" spacing={1}>
                {isLoggedIn ? (
                  <Button
                    sx={{ color: "neutral.600" }}
                    onClick={removeUser}
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ExitToApp />
                      </SvgIcon>
                    }
                  >
                    Logout
                  </Button>
                ) : (
                  <Box component={Link} to="/auth/login">
                    <Button
                      sx={{ color: "neutral.600" }}
                      startIcon={
                        <SvgIcon fontSize="small">
                          <PeopleAlt />
                        </SvgIcon>
                      }
                    >
                      Login
                    </Button>
                  </Box>)}
              </Stack>
            </Box>
          </>
        )}

        {lgDown && (
          <Box
            component={"div"}
            sx={{
              display: "flex",
            }}
          >
            <IconButton onClick={() => setShowDrawer(true)}>
              <SvgIcon fontSize="small">
                <MenuIcon />
              </SvgIcon>
            </IconButton>
          </Box>
        )}

        <Drawer
          anchor={"right"}
          open={showDrawer}
          onClose={() => setShowDrawer(false)}
          sx={{
            zIndex: 2000,
          }}
          PaperProps={{
            sx: {
              width: 240,
              pt: 2,
            },
          }}
        >
          <RenderLogo />
          <Box component={"div"} sx={{ mt: 4 }}>
            <Stack spacing={1}>
              <Link to={"/dashboard"}>
                <Button sx={{ color: "neutral.600" }}>Dashboard</Button>
              </Link>
              <Link to={"/dashboard/appointment"}>
                <Button sx={{ color: "neutral.600" }}>Appointment</Button>
              </Link>
              <Link to={"/dashboard/appointment"}>
                <Button sx={{ color: "neutral.600" }}>Contact</Button>
              </Link>
              <Link to={"/dashboard/appointment"}>
                <Button sx={{ color: "neutral.600" }}>Details</Button>
              </Link>
            </Stack>
          </Box>
          <Box component={"div"} sx={{ mt: 4 }}>
            <Stack spacing={1}>
              <Box component={Link} to="/auth/login">
                <Button
                  sx={{ color: "neutral.600" }}
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PeopleAlt />
                    </SvgIcon>
                  }
                >
                  Account
                </Button>
              </Box>
            </Stack>
          </Box>
        </Drawer>
      </Container>
    </Box>
  );
};

export default Header;
