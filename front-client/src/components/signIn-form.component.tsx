// ========================== react ==========================
import { FC, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// ========================== yup ==========================
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "./signIn-form.const";

// ========================== mui ==========================
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, Paper, Typography } from "@mui/material";

interface IFormInput {
  email: string;
  password: string;
}

const SignInForm = ({
  handleSignIn,
  error,
}: {
  handleSignIn: (s: IFormInput) => void;
  error: boolean;
}) => {
  const navigate = useNavigate();

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

  const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => {
    handleSignIn(data);
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

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <Button type="submit" disabled={!isValid} variant="contained">
            Sign In
          </Button>
          <Button variant="contained" onClick={() => navigate("/auth/signUp")}>
            Sign Up
          </Button>
        </Box>

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

export default SignInForm;
