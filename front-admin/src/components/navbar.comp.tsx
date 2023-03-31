// ========================== react ==========================
import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

// ========================== mui ==========================
import { styled } from "@mui/material/styles";
import {
  Box,
  Drawer,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Container,
  CssBaseline,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

// ========================== store ==========================
import { AppDispatch } from "../store";
import { logout } from "../app/login/store/auth.slice";

// ========================== initial settings ==========================
const userSettings = ["Logout"];
const navbarSettings = ["Products", "Orders", "Users", "Roles"];
const drawerWidth = 200;

// ========================== local interface ==========================
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

// ========================== styled ==========================
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const PageNavBarComp: FC = () => {
  // ===== hooks =====
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // ===== local state =====
  const [open, setOpen] = useState<boolean>(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  // ===== handlers =====
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (field: string) => {
    switch (field) {
      case "Logout":
        dispatch(logout());
        window.localStorage.removeItem("token");
        navigate("/");
        break;
      default:
        break;
    }
    setAnchorElUser(null);
  };

  // ===== auth check =====
  const token = window.localStorage.getItem("token");
  let isAuth = false;
  if (token) {
    isAuth = true;
  }

  return (
    <Box component={"nav"} sx={{ display: "flex" }}>
      <CssBaseline />
      {/* header */}
      <AppBar position="fixed" open={open}>
        <Toolbar>
          {isAuth ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              data-testid="drawer-open-button-test"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
          ) : null}
          <Container
            maxWidth="xl"
            sx={{
              display: "flex",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
              }}
            >
              {/* current user logo & menu */}
              <Tooltip
                title="Open settings"
                data-testid="open-settings-button-test"
              >
                {isAuth ? (
                  <IconButton onClick={handleOpenUserMenu}>
                    <VerifiedUserIcon
                      fontSize="large"
                      sx={{
                        color: "success.light",
                      }}
                    />
                  </IconButton>
                ) : (
                  <IconButton sx={{ p: 0 }}>
                    <VerifiedUserIcon
                      fontSize="large"
                      sx={{
                        color: "error.main",
                      }}
                    />
                  </IconButton>
                )}
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                data-testid="hidden-menu-test"
                onClose={handleCloseUserMenu}
              >
                {userSettings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleCloseUserMenu(setting)}
                    data-testid={`hidden-menu-${setting}`}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
      {/* aside menu */}
      {isAuth ? (
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
          data-testid="drawer-test"
        >
          <DrawerHeader>
            <IconButton
              onClick={handleDrawerClose}
              data-testid="drawer-close-button-test"
            >
              <ChevronLeftIcon />
            </IconButton>
          </DrawerHeader>
          <Divider />
          {/* links */}
          <List>
            {navbarSettings.map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  onClick={() => navigate(`/${text.toLowerCase()}`)}
                >
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      ) : null}
    </Box>
  );
};

export default PageNavBarComp;
