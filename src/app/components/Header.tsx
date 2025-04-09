"use client";
import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Button,
  Divider,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import Image from "next/image";

const StyledButton = styled(Button)(() => ({
  "&:hover": {
    backgroundColor: "#0f507c",
  },
  fontSize: "16px",
  textTransform: "none",
  fontWeight: "bold",
  color: "white",
}));

const Logo = () => (
  <Link href="/" passHref>
    <Image
      src="/LogoIcon.png"
      alt="Logo"
      width={40}
      height={40}
      style={{ cursor: "pointer" }}
      unoptimized
    />
  </Link>
);

function Header() {
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const handleOpenNavMenu = () => {
    setOpenDrawer(true);
  };

  const handleCloseNavMenu = () => {
    setOpenDrawer(false);
  };

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "#093a63", borderBottom: "1px solid #CBAB70" }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          maxWidth: "1024px",
          width: "100%",
          margin: "0 auto",
          position: "relative",
        }}
      >
        <Box sx={{ display: { xs: "none", sm: "flex" }, flexGrow: 1 }}>
          <Logo />
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexGrow: 1,
            justifyContent: "flex-end",
          }}
        >
          <Link href="/" passHref>
            <StyledButton>INICIO</StyledButton>
          </Link>
          <Link href="/champions" passHref>
            <StyledButton>CAMPEONES</StyledButton>
          </Link>
          <Link href="/stories" passHref>
            <StyledButton>HISTORIAS</StyledButton>
          </Link>
          
          <Link href="/apoyo" passHref>
            <StyledButton>APOYO</StyledButton>
          </Link>
        </Box>

        <Box
          sx={{
            display: { xs: "flex", sm: "none" },
            flexGrow: 1,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton
            size="large"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
            sx={{ position: "absolute", left: "20px" }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexGrow: 1,
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              visibility: openDrawer ? "hidden" : "visible",
            }}
          >
            <Logo />
          </Box>
        </Box>

        <Drawer
          anchor="left"
          open={openDrawer}
          onClose={handleCloseNavMenu}
          sx={{
            "& .MuiDrawer-paper": {
              backgroundColor: "#093a63",
              width: "200px",
              padding: "20px",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "20px",
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexGrow: 1,
                marginTop: "20px",
              }}
            >
              <Logo />
            </Box>
            <IconButton
              onClick={handleCloseNavMenu}
              sx={{
                color: "white",
                position: "absolute",
                right: "-15px",
                top: "-5px",
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Divider sx={{ my: 1, width: "100%", backgroundColor: "white" }} />
            <Link href="/" passHref>
              <StyledButton onClick={handleCloseNavMenu}>INICIO</StyledButton>
            </Link>
            <Link href="/champions" passHref>
              <StyledButton onClick={handleCloseNavMenu}>CAMPEONES</StyledButton>
            </Link>
            <Link href="/stories" passHref>
              <StyledButton onClick={handleCloseNavMenu}>HISTORIAS</StyledButton>
            </Link>
            
            <Link href="/apoyo" passHref>
              <StyledButton onClick={handleCloseNavMenu}>APOYO</StyledButton>
            </Link>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
