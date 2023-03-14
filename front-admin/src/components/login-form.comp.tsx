// ========================== react ==========================
import { FC } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

// ========================== mui ==========================
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

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
              height: 500,
              backgroundColor: "lightgray",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              p: 3,
              gap: 2,
            }}
          >
            <h1>Login</h1>
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
              <p>This field is required</p>
            )}
            {errors?.email?.type === "pattern" && (
              <p>Entered value does not match email format</p>
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
              <p>This field is required</p>
            )}
            {errors?.password?.type === "minLength" && <p>Min length is 5</p>}
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
