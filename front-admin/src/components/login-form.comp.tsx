// ========================== react ==========================
import { FC, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// ========================== yup ==========================
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "./login-form.const";
import { decodeToken } from "react-jwt";

// ========================== mui ==========================
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, Paper, Typography } from "@mui/material";
import { fetchAuth } from "../app/login/store/auth.slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";

interface IFormInput {
  email: string;
  password: string;
}

const LoginForm: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormInput>({
    defaultValues: {
      email: "superadmin@gmail.com",
      password: "123123123",
    },
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const newToken = await dispatch(fetchAuth(data));
    if (!newToken.payload) {
      //ERROR: FAILED TO SIGNIN
      setError(true);
    }
    if (newToken.payload) {
      const user: any = decodeToken(newToken.payload);
      if (user.role_type === "user") {
        window.localStorage.setItem("token", newToken.payload);
        window.location.replace("https://http://localhost:3001/")
        console.log("Redirect to shop");
        navigate("/");
        setError(false);
      } else {
        window.localStorage.setItem("token", newToken.payload);
        console.log("Redirect to roles table");
        navigate("/roles");
        setError(false);
      }
    }
  };

  return (
    <Paper
      sx={{
        maxWidth: 400,
        height: 340,
        backgroundColor: "lightblue",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Typography variant="h5" fontWeight={"bold"} pb={3}>
        Login
      </Typography>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: 20 }}
      >
        <Controller
          name="email"
          control={control}
          render={() => (
            <TextField
              id="outlined-basic"
              label="email"
              variant="outlined"
              {...register("email")}
              placeholder="example@gmail.com"
            />
          )}
        />

        <Typography variant="caption" color={"red"}>
          {errors.email?.message}
        </Typography>

        <Controller
          name="password"
          control={control}
          render={() => (
            <TextField
              id="outlined-basic"
              label="password"
              type="password"
              variant="outlined"
              {...register("password", {
                required: true,
                minLength: {
                  value: 5,
                  message: "min length is 5",
                },
              })}
              placeholder="password"
            />
          )}
        />

        <Typography variant="caption" color={"red"}>
          {errors.password?.message}
        </Typography>

        <Button type="submit" disabled={!isValid} variant="contained">
          Login
        </Button>

        {error === true ? (
          <Box
            sx={{
              display: "flex",
              border: "2px solid red",
              padding: "5px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="caption" color={"red"}>
              ERROR: FAILED TO SIGNIN
            </Typography>
          </Box>
        ) : null}
      </form>
    </Paper>
  );
};

export default LoginForm;
