// ========================== react ==========================
import { FC, useState } from "react";

// ========================== components ==========================
import LoginForm from "../../components/login-form.comp";

// ========================== mui ==========================
import Box from "@mui/material/Box";
import { decodeToken } from "react-jwt";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import { fetchAuth } from "./store/auth.actions";
import { UserRoles } from "../roles/types/user-roles.enum";

interface IFormInput {
  email: string;
  password: string;
}

export const handleResponse = (response: any, navigate: (path: string) => void) => {

  if (response.payload) {
    const user: any = decodeToken(response.payload);
    if (user && user.role_type && user.role_type === UserRoles.user) {
      window.location.replace("http://localhost:3001");
    } else {
      window.localStorage.setItem("token", response.payload);
      navigate("/products");
    }
  }
};

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState(false);

  const handleSave = async (data: IFormInput) => {
    const newToken = await dispatch(fetchAuth(data));
    handleResponse(newToken, navigate);
    setError(false);
  };

  return (
    <Box>
      <LoginForm handleSave={handleSave} error={error} />
    </Box>
  );
};
export default LoginPage;

// const LoginPage: FC = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch<AppDispatch>();
//   const [error, setError] = useState(false);

//   const handleSave = async (data: IFormInput) => {
//     const newToken = await dispatch(fetchAuth(data));
//     if (newToken.payload) {
//       const user: any = decodeToken(newToken.payload);
//       if (user.role_type === "user") {
//         window.location.replace("http://localhost:3001");
//         setError(false);
//       } else {
//         window.localStorage.setItem("token", newToken.payload);
//         navigate("/products");
//         setError(false);
//       }
//     }
//   };
//   return (
//     <Box>
//       <LoginForm handleSave={handleSave} error={error} />
//     </Box>
//   );
// };

// export default LoginPage;
