import { useState } from "react";

import { useTranslation } from "react-i18next";

// =========================== mui ===========================
import { ToggleButtonGroup, ToggleButton, styled } from "@mui/material";
import { successLight, primaryLight } from "../theme/mainTheme.actions";

const StyledButtonGroup = styled(ToggleButtonGroup)`
  button {
    background-color: ${primaryLight};
    &[aria-pressed="true"] {
      background-color: ${successLight};
    }
  }
`;

const LanguageSwitcher = () => {
  // ===== i18n =====
  const { i18n } = useTranslation();

  // ===== local state =====
  const [language, setLanguage] = useState(`${i18n.language}`);

  // ===== handlers =====
  const handleLanguageChange = (
    _: React.MouseEvent<HTMLElement>,
    newLanguage: "en" | "ru"
  ) => {
    if (!newLanguage) return;
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  return (
    <StyledButtonGroup
      value={language}
      exclusive
      onChange={handleLanguageChange}
      aria-label="Platform"
      size="small"
    >
      <ToggleButton value="en">En</ToggleButton>
      <ToggleButton value="ru">Ru</ToggleButton>
    </StyledButtonGroup>
  );
};

export default LanguageSwitcher;
