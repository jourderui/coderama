import { ReactElement, useEffect } from "react";
import { ThemeProvider, THEME_ID, createTheme } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps): ReactElement => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const materialTheme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    palette: {
      primary: {
        light: '#9e9e9e',
        main: '#424242',
        dark: '#212121',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ccff90',
        main: '#b2ff59',
        dark: '#76ff03',
        contrastText: '#000',
      },
    },
  });

  return (
    <ThemeProvider theme={{ [THEME_ID]: materialTheme }}>
      <Header />
        <Outlet />
        {children}
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;
