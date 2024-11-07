import { ReactElement, ReactNode } from "react";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

interface Props {
  children?: ReactNode;
  className?: string;
}

export const Footer = ({ className }: Props): ReactElement => {
  return (
    <Box sx={{ flexGrow: 1 }}>
    </Box>
  );
};
