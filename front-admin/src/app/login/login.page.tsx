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

interface IFormInput {
  email: string;
  password: string;
}

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState(false);

  const handleSave = async (data: IFormInput) => {
    const newToken = await dispatch(fetchAuth(data));
    if (!newToken.payload) {
      //ERROR: FAILED TO SIGNIN
      setError(true);
    }
    if (newToken.payload) {
      const user: any = decodeToken(newToken.payload);
      if (user.role_type === "user") {
        window.location.replace("http://localhost:3001");
        setError(false);
      } else {
        window.localStorage.setItem("token", newToken.payload);
        navigate("/products");
        setError(false);
      }
    }
  };
  return (
    <Box>
      <LoginForm handleSave={handleSave} error={error} />
    </Box>
  );
};

export default LoginPage;
