// ========================== react ==========================
import { FC } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

// ========================== yup ==========================
import { formSchema } from "./signUp-form.const";
import { yupResolver } from "@hookform/resolvers/yup";

// ========================== mui ==========================
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Paper, Typography } from "@mui/material";

interface IFormInput {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm: FC = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormInput>({
    defaultValues: {
      firstName: "",
      lastName: "",
      middleName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data: any) => {
    /*
     Тут нужно допилить регу
     */
    console.log(data)
  }

  return (
    <Paper
      sx={{
        maxWidth: 400,
        height: 400,
        backgroundColor: "lightblue",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Typography variant="h5" fontWeight={"bold"} pb={3}>
        Sign Up
      </Typography>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: 5 }}
      >
        <Controller
          name="firstName"
          control={control}
          render={() => (
            <TextField
              id="outlined-basic"
              label="first name"
              variant="outlined"
              {...register("firstName")}
              placeholder="Elvis"
            />
          )}
        />

        <Typography variant="caption" color={"red"}>
          {errors.firstName?.message}
        </Typography>

        <Controller
          name="middleName"
          control={control}
          render={() => (
            <TextField
              id="outlined-basic"
              label="middle name"
              variant="outlined"
              {...register("middleName")}
              placeholder="Aaron"
            />
          )}
        />

        <Controller
          name="lastName"
          control={control}
          render={() => (
            <TextField
              id="outlined-basic"
              label="last name"
              variant="outlined"
              {...register("lastName")}
              placeholder="Presley"
            />
          )}
        />

        <Typography variant="caption" color={"red"}>
          {errors.lastName?.message}
        </Typography>

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
          name="phone"
          control={control}
          render={() => (
            <TextField
              id="outlined-basic"
              label="phone"
              variant="outlined"
              {...register("phone")}
              placeholder="+375 XX XXX XX XX"
            />
          )}
        />

        <Typography variant="caption" color={"red"}>
          {errors.phone?.message}
        </Typography>

        <Controller
          name="password"
          control={control}
          render={() => (
            <TextField
              id="outlined-basic"
              label="password"
              variant="outlined"
              {...register("password")}
              placeholder="password"
            />
          )}
        />

        <Typography variant="caption" color={"red"}>
          {errors.password?.message}
        </Typography>

        <Controller
          name="confirmPassword"
          control={control}
          render={() => (
            <TextField
              id="outlined-basic"
              label="confirm password"
              variant="outlined"
              {...register("confirmPassword")}
              placeholder="password"
            />
          )}
        />

        <Typography variant="caption" color={"red"}>
          {errors.confirmPassword?.message}
        </Typography>

        <Button type="submit" disabled={!isValid} variant="contained">
          Sign Up
        </Button>
      </form>
    </Paper>
  );
};

export default SignUpForm;
