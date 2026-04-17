import { useMemo } from "react";
import { profileData } from "../data/profileData";
import { ENV } from "../config/env";

export default function useProfileData() {
  const cvPdfUrl = useMemo(() => `${ENV.PUBLIC_URL}/CV.pdf`, []);

  return useMemo(
    () => ({
      ...profileData,
      cvPdfUrl,
    }),
    [cvPdfUrl]
  );
}
