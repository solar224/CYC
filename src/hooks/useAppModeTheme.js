import { useContext, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeContext } from "../context/ThemeContext";

export default function useAppModeTheme() {
  const { theme: mode } = useContext(ThemeContext);

  return useMemo(
    () =>
      createTheme({
        palette: { mode },
      }),
    [mode]
  );
}
