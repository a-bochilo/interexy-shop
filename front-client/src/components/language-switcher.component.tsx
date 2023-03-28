import { useState } from "react";

import { useTranslation } from "react-i18next";

// =========================== MUI ===========================
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
    const { i18n } = useTranslation();

    const [language, setLanguage] = useState(`${i18n.language}`);

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
            // color="success"
            size="small"
        >
            <ToggleButton value="en">En</ToggleButton>
            <ToggleButton value="ru">Ru</ToggleButton>
        </StyledButtonGroup>
    );
};

export default LanguageSwitcher;
