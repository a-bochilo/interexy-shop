// ========================== react ==========================
import { FC } from "react";

// ========================== components ==========================
import LoginForm from "../../components/login-form.comp";

// ========================== mui ==========================
import Box from "@mui/material/Box";
import { decodeToken } from "react-jwt";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import { fetchSignIn } from "./store/auth.actions";
import { UserRoles } from "../roles/types/user-roles.enum";
import { useSelector } from "react-redux";
import { AuthErrorSelector } from "./store/auth.selector";

interface IFormInput {
  email: string;
  password: string;
}

export const handleResponse = (
  response: any,
  navigate: (path: string) => void
) => {
  if (response.meta.requestStatus !== "rejected") {
    const user: any = decodeToken(response.payload);
    if (user && user.role_type && user.role_type === UserRoles.user) {
      window.location.replace("http://localhost:8000");
    } else {
      window.localStorage.setItem("token", response.payload);
      navigate("/products");
    }
  }
};

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const fetchingErrors = useSelector(AuthErrorSelector);

  const handleSave = async (data: IFormInput) => {
    const response = await dispatch(fetchSignIn(data));
    handleResponse(response, navigate);
  };

  return (
    <Box>
      <LoginForm
        handleSave={handleSave}
        fetchingErrors={fetchingErrors.token}
      />
    </Box>
  );
};
export default LoginPage;
