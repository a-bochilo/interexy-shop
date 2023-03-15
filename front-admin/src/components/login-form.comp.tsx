// ========================== react ==========================
import { FC } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

// ========================== mui ==========================
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Paper, Typography } from "@mui/material";
import { display } from "@mui/system";

interface IFormInput {
  email: string;
  password: string;
}

const LoginForm: FC = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormInput>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  //   const onSubmit = async (values) => {
  //     const data = await dispatch(fetchAuth(values));
  //     if (!data.payload) {
  //         alert("Failed to login");
  //     }
  //     if ('token' in data.payload) {
  //         window.localStorage.setItem('token', data.payload.token);
  //     }
  // };

  // if (isAuth) {
  //   return <Navigate to={'/'}/>
  // }

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
              {...register("email", {
                required: true,
                pattern: /\S+@\S+\.\S+/,
              })}
              placeholder="example@gmail.com"
            />
          )}
        />

        {errors?.email?.type === "required" && (
          <Typography variant="caption" color={"red"}>
            ⚠ This field is required
          </Typography>
        )}
        {errors?.email?.type === "pattern" && (
          <Typography variant="caption" color={"red"}>
            ⚠ Entered value does not match email format
          </Typography>
        )}

        <Controller
          name="password"
          control={control}
          render={() => (
            <TextField
              id="outlined-basic"
              label="password"
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

        {errors?.password?.type === "required" && (
          <Typography variant="caption" color={"red"}>
            ⚠ This field is required
          </Typography>
        )}
        {errors?.password?.type === "minLength" && (
          <Typography variant="caption" color={"red"}>
            ⚠ Min length is 5
          </Typography>
        )}
        <Button type="submit" disabled={!isValid} variant="contained">
          Login
        </Button>
      </form>
    </Paper>
  );
};

export default LoginForm;
