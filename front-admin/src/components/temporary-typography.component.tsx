import styled from "@emotion/styled";
import { Typography, TypographyProps } from "@mui/material";

const CustomTypography = styled(Typography)`
        animation: dissapear 2s 1 forwards ease-in;
            
        @keyframes dissapear {
            0% {
                opacity: 1;
            }
            100% {
                opacity: 0;
        } 
    `;

const TemporaryTypography = (props: TypographyProps) => {
    return <CustomTypography {...props} />;
};

export default TemporaryTypography;
