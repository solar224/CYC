import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";
import { matchRouteMeta } from "../config/routeRegistry";
import { t } from "../i18n/messages";

export default function useRouteDocumentTitle() {
  const location = useLocation();
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    const meta = matchRouteMeta(location.pathname);
    const title = meta?.titleKey ? t(meta.titleKey, language) : t("brand.name", language);
    document.title = `${title} | ${t("brand.name", language)}`;
  }, [language, location.pathname]);
}
