import PropTypes from "prop-types";
import { Notifications, MoreVert, ExitToApp } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
  useMediaQuery,
  Theme,
  Link,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import useAuth from "../../hooks/useAuth";
import { capitalize } from "../../utils/string";

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

interface NavbarProps {
  onNavOpen?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export const Navbar = (props: NavbarProps) => {
  const { onNavOpen } = props;
  const lgUp = useMediaQuery<Theme>((theme: Theme) =>
    theme.breakpoints.up("lg")
  );
  const { removeUser, user } = useAuth();

  const role = capitalize(user?.role);
  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: "blur(6px)",
          backgroundColor: (theme) =>
            alpha(theme.palette.background.default, 0.8),
          position: "sticky",
          left: {
            lg: `${SIDE_NAV_WIDTH}px`,
          },
          top: 0,
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
          },
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2,
          }}
        >
          <Stack alignItems="center" direction="row" spacing={2}>
            {!lgUp && (
              <IconButton onClick={onNavOpen}>
                <SvgIcon fontSize="small">
                  <MoreVert />
                </SvgIcon>
              </IconButton>
            )}
          </Stack>
          <Stack alignItems="center" direction="row" spacing={2}>
            <Tooltip title="Notifications">
              <IconButton>
                <Badge badgeContent={0} color="primary">
                  <SvgIcon fontSize="small">
                    <Notifications />
                  </SvgIcon>
                </Badge>
              </IconButton>
            </Tooltip>
            <Badge badgeContent={role} color="primary">
              <Tooltip title="Account">
                <Link href="/dashboard/account">
                  <Avatar
                    sx={{
                      cursor: "pointer",
                      height: 40,
                      width: 40,
                    }}
                    src="/assets/avatars/avatar-anika-visser.png"
                  />
                </Link>
              </Tooltip>
            </Badge>
            <Tooltip title="Logout">
              <IconButton onClick={removeUser} href="/auth/login">
                <SvgIcon fontSize="small">
                  <ExitToApp />
                </SvgIcon>
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

Navbar.propTypes = {
  onNavOpen: PropTypes.func,
};

export default Navbar;
