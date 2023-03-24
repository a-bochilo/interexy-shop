// ========================== mui ==========================
import { createTheme } from "@mui/material";
import { Theme } from "@mui/material/styles/createTheme";

export interface ITheme {
    theme: Theme;
}

const theme: Theme = createTheme({
    palette: {
        primary: {
            main: "#1d2978",
            light: "#F4F7FB",
            text: "#000000",
            backgroundColor: "#F7F7F7",
        },
        secondary: {
            main: "#f3fad1",
            text: "#0F172A",
        },
        error: {
            main: "#B91C1C",
            light: "#FECACA",
        },
        success: {
            main: "#2e7d32",
            light: "#4caf50",
        },
        info: {
            main: "#ffffff",
        },
        warning: {
            main: "#FDE68A",
            text: "#D97706",
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 576,
            md: 868,
            lg: 992,
            xl: 1200,
            xxl: 1400,
            mobile: 0,
            tablet: 640,
            laptop: 1024,
            desktop: 1200,
        },
    },

    typography: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 12,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
        @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Inter'), local('Inter-Regular'), url("Inter") format('truetype');
        };
        @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-display: swap;
          font-weight: 700;
          src: local('Inter'), local('Inter-SemiBold'), url("Inter") format('truetype');         
        };
         @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-display: swap;
          font-weight: 700;
          src: local('Inter'), local('Inter-SemiBold'), url("Inter") format('truetype');         
        };
        body {
          height: 100vh;
          font-family: 'Inter';
        };
        #root {
           height: 100vh;
        };
        .aside-active-link {
          filter: invert(62%) sepia(72%) saturate(6425%) hue-rotate(197deg) brightness(98%) contrast(101%);
        }
        .rdp {
          --rdp-accent-color: #ff3232;
          
        }
        :root {
          --header-height: 92px;
          --toastify-color-warning: #b7b24d;
          --toastify-color-success: #1D7832;
          --toastify-color-error: #ba1a1c;
          --toastify-color-info: #808182;
        }
        `,
        },
    },
});

declare module "@mui/material/styles" {
    interface Palette {
        backgroundColor?: Palette["primary"];
    }
    interface PaletteOptions {
        backgroundColor?: PaletteOptions["primary"];
    }

    interface PaletteColor {
        backgroundColor?: string;
        text?: string;
    }
    interface SimplePaletteColorOptions {
        backgroundColor?: string;
        text?: string;
    }
    interface BreakpointOverrides {
        xs: true;
        sm: true;
        md: true;
        lg: true;
        xl: true;
        xxl: true;
        mobile?: true;
        tablet?: true;
        laptop?: true;
        desktop?: true;
    }
}

export default theme;
