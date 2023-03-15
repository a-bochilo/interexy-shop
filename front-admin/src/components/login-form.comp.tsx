// ========================== react ==========================
import { FC } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

// ========================== mui ==========================
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { red } from "@mui/material/colors";

interface IFormInput {
  email: string;
  password: string;
}

const LoginForm: FC = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section>
          <Box
            sx={{
              width: 500,
              height: 400,
              backgroundColor: "lightgray",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              p: 3,
              gap: 2,
            }}
          >
            <Typography variant="h5" fontWeight={"bold"}>
              Login
            </Typography>
            <label htmlFor="email">email</label>
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
              <Typography color={"red"}>⚠ This field is required</Typography>
            )}
            {errors?.email?.type === "pattern" && (
              <Typography color={"red"}>
                ⚠ Entered value does not match email format
              </Typography>
            )}
            <label htmlFor="password">password</label>

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
              <Typography color={"red"}>⚠ This field is required</Typography>
            )}
            {errors?.password?.type === "minLength" && (
              <Typography color={"red"}>⚠ Min length is 5</Typography>
            )}
            <Button type="submit" variant="contained">
              SUBMIT
            </Button>
          </Box>
        </section>
      </form>
    </div>
  );
};

export default LoginForm;
