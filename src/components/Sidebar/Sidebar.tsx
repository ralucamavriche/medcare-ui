import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { Category } from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery,
  Theme,
  ModalProps,
} from "@mui/material";

import Logo from "../Logo";
import Scrollbar from "../Scrollbar";
import SidebarItem from "../SidebarItem";
import { dashboardItems } from "../../layouts/Dashboard/config";
import useAuth from "../../hooks/useAuth";
import { ROLES, getPermission } from "../../permissions";

interface SidebarProps {
  open?: boolean;
  onClose?: ModalProps["onClose"];
}

const Sidebar = (props: SidebarProps) => {
  const { open, onClose } = props;
  const location = useLocation();
  const { user } = useAuth();

  const pathname = location.pathname;

  const lgUp = useMediaQuery<Theme>((theme: Theme) =>
    theme.breakpoints.up("lg")
  );

  const content = (
    <Scrollbar
      sx={{
        height: "100%",
        "& .simplebar-content": {
          height: "100%",
        },
        "& .simplebar-scrollbar:before": {
          background: "neutral.400",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            component={Link}
            to="/"
            sx={{
              display: "inline-flex",
              height: 32,
              width: 32,
            }}
          >
            <Logo />
          </Box>
          <Box
            sx={{
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              borderRadius: 1,
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              mt: 2,
              p: "12px",
            }}
          >
            <div>
              <Typography color="inherit" variant="subtitle1">
                Categories
              </Typography>
            </div>
            <SvgIcon fontSize="small" sx={{ color: "neutral.500" }}>
              <Category />
            </SvgIcon>
          </Box>
        </Box>
        <Divider sx={{ borderColor: "neutral.700" }} />
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3,
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: "none",
              p: 0,
              m: 0,
            }}
          >
            {dashboardItems.map((item) => {
              const active = item.path ? pathname === item.path : false;
              const hasRole = getPermission(user?.role as ROLES, item.resource);

              if (!hasRole) {
                return null;
              }

              return (
                <SidebarItem
                  active={active}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                />
              );
            })}
          </Stack>
        </Box>
        <Divider sx={{ borderColor: "neutral.700" }} />
      </Box>
    </Scrollbar>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.800",
            color: "common.white",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.800",
          color: "common.white",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

Sidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

export default Sidebar;
