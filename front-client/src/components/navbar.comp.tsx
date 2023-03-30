// ========================== react ==========================
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { startCase } from "lodash";
import { useTranslation } from "react-i18next";

// ========================== mui ==========================
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import {
  Button,
  Container,
  CssBaseline,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

// ========================== Enums ==========================
import { ProductsCategory } from "../app/products/types/products-category.enum";
import { ICategoriesSelector } from "../app/products/types/products-category.enum";

// ========================== store ==========================
import { logout } from "../app/auth/store/auth.slice";
import { useAppSelector } from "../store";
import { AppDispatch } from "../store";
import { cartSelector } from "../app/cart/store/cart.selectors";

// ========================== components ==========================
import SearchComponent from "./search.component";
import CartIconComponent from "./cart-icon.component";
import LanguageSwitcher from "./language-switcher.component";
import { ISettings, SettingsEnum } from "../app/auth/types/settings.enum";

const drawerWidth = 200;
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

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

const PageNavBarComp = () => {
  const cartItemsQuantity = useAppSelector(cartSelector)?.items.length;

  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const enumSettings = Object.values(SettingsEnum).slice(0, 3);

  const settingsTranslations: ISettings = t("headerSettings", {
    returnObjects: true,
  });

  const categoriesTranslations: ICategoriesSelector = t("products.categories", {
    returnObjects: true,
  });

  const [open, setOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const token = window.localStorage.getItem("token");
  let isAuth = false;
  if (token) {
    isAuth = true;
  }

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
      case SettingsEnum.account:
        navigate("/profile");
        break;
      case SettingsEnum.myOrders:
        navigate("/orders/profile");
        break;
      case SettingsEnum.logout:
        dispatch(logout());
        window.localStorage.removeItem("token");
        navigate("/");
        break;
      default:
        break;
    }
    setAnchorElUser(null);
  };

  return (
    <Box component={"nav"} sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>

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
              <SearchComponent label={t("search")} />

              <LanguageSwitcher />

              {isAuth ? (
                <>
                  <CartIconComponent
                    itemsQuantity={cartItemsQuantity}
                    navigate={navigate}
                  />

                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <VerifiedUserIcon
                        fontSize="large"
                        sx={{
                          color: "success.light",
                        }}
                      />
                    </IconButton>
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
                    onClose={handleCloseUserMenu}
                  >
                    {enumSettings.map((item) => (
                      <MenuItem
                        value={item}
                        key={item}
                        onClick={() => handleCloseUserMenu(item)}
                      >
                        <Typography textAlign="center">
                          {settingsTranslations[item]}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              ) : (
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => navigate("/auth/signIn")}
                >
                  {settingsTranslations.signIn}
                </Button>
              )}
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
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
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem key={"Catalog"} disablePadding>
            <ListItemButton onClick={() => navigate("/")}>
              <ListItemText
                primary={
                  <Typography sx={{ fontWeight: "bold" }}>
                    {t("links.catalog")}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
          {Object.values(ProductsCategory).map((category) => (
            <ListItem key={category} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate(`/products?category=${category}`);
                  navigate(0);
                }}
              >
                <ListItemText
                  primary={`> ${startCase(categoriesTranslations[category])}`}
                  sx={{ ml: 3 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default PageNavBarComp;