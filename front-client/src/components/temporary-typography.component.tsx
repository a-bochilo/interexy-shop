import styled from "@emotion/styled";
import { Typography, TypographyProps } from "@mui/material";

interface ITypographyProps extends TypographyProps {
    duration: number;
}

const TemporaryTypography = ({ duration, ...props }: ITypographyProps) => {
    const CustomTypography = styled(Typography)`
        animation: dissapear ${duration}s 1 forwards ease-in;
            
        @keyframes dissapear {
            0% {
                opacity: 1;
            }
            70% {
                opacity: 1;
            }
            100% {
                opacity: 0;
        } 
    `;

    return <CustomTypography {...props} />;
};

export default TemporaryTypography;
