import styled from "@emotion/styled";
import { Typography, TypographyProps } from "@mui/material";

interface ITypographyProps extends TypographyProps {
  duration: number;
  timeoutFunction?: (b: boolean) => void;
}

const TemporaryTypography = (props: ITypographyProps) => {
  const { duration, timeoutFunction, ...typographyProps } = props;

  if (timeoutFunction)
    setTimeout(() => timeoutFunction(false), duration * 1000);

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

  return <CustomTypography {...typographyProps} />;
};

export default TemporaryTypography;
