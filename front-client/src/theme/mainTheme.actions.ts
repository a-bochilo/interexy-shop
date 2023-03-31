// ========================== mui ==========================
import { ITheme } from "./mainTheme";

// breakpoints
export const downMd = ({ theme }: ITheme) => theme.breakpoints.down("md");

// colors
export const primaryMain = ({ theme }: ITheme) => theme.palette.primary.main;
export const primaryLight = ({ theme }: ITheme) => theme.palette.primary.light;
export const primaryText = ({ theme }: ITheme) => theme.palette.primary.text;
export const primaryBackground = ({ theme }: ITheme) =>
  theme.palette.primary.backgroundColor;
export const secondaryMain = ({ theme }: ITheme) =>
  theme.palette.secondary.main;
export const errorMain = ({ theme }: ITheme) => theme.palette.error.main;
export const secondaryText = ({ theme }: ITheme) =>
  theme.palette.secondary.text;
export const successLight = ({ theme }: ITheme) => theme.palette.success.light;
