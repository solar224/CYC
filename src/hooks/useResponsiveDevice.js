import { useMemo } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function useResponsiveDevice() {
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  return useMemo(() => {
    const layoutKind = isDesktop ? "desktop" : "mobile";
    const deviceKind = isDesktop ? "desktop" : isTablet ? "tablet" : "mobile";

    return {
      isPhone,
      isTablet,
      isDesktop,
      isMobile: !isDesktop,
      layoutKind,
      deviceKind,
    };
  }, [isPhone, isTablet, isDesktop]);
}
