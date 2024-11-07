import { ReactElement, ReactNode } from "react";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";

interface Props {
  children?: ReactNode;
  className?: string;
}

export const Header = ({ className }: Props): ReactElement => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar  sx={{display: 'flex', flexDirection: 'column', justifyContent: "center"}} variant="dense">
          <Typography variant="h3" color="inherit" component="div" >
            CODERAMA
          </Typography>
          <Link href="/" underline="hover" sx={{color: "primary.contrastText"}}>Home</Link>
          <Link href="/favourites" sx={{color: "primary.contrastText"}} underline="hover">Favourite Movies</Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
