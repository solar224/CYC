import { useSnackbar } from "notistack";
import { t } from "../i18n/messages";

export function usePreferenceSnackbar() {
  const { enqueueSnackbar } = useSnackbar();

  const notify = (message) => {
    enqueueSnackbar(message, {
      variant: "success",
      style: { maxWidth: "70%", minWidth: "250px" },
    });
  };

  const showSettingsSaved = (language) => {
    notify(t("floating.settings.saved", language));
  };

  const showLanguageChanged = (nextLanguage) => {
    notify(t("feedback.language.changed", nextLanguage));
  };

  const showThemeChanged = (language, nextTheme) => {
    const themeName = t(nextTheme === "dark" ? "feedback.theme.dark" : "feedback.theme.light", language);
    notify(t("feedback.theme.changed", language, { theme: themeName }));
  };

  return {
    showSettingsSaved,
    showLanguageChanged,
    showThemeChanged,
  };
}
