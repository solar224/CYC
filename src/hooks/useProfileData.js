import { useMemo } from "react";
import { profileData } from "../data/profileData";

export default function useProfileData() {
  const cvPdfUrl = useMemo(() => `${process.env.PUBLIC_URL}/CV.pdf`, []);

  return useMemo(
    () => ({
      ...profileData,
      cvPdfUrl,
    }),
    [cvPdfUrl]
  );
}
