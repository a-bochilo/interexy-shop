// ========================== react ==========================
import { FC } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

// ========================== yup ==========================
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "./reg-form.const";

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

const phoneRegExp = /^(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/;

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

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  //   const onSubmit = async (values) => {
  //     const data = await dispatch(fetchRegister(values));
  //     if (!data.payload) {
  //         alert("Failed to register");
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
        style={{ display: "flex", flexDirection: "column", gap: 20 }}
      >
        <Controller
          name="firstName"
          control={control}
          render={() => (
            <TextField
              id="outlined-basic"
              label="first name"
              variant="outlined"
              {...register("firstName", {
                required: true,
              })}
              placeholder="Elvis"
            />
          )}
        />

        {errors?.firstName?.type === "required" && (
          <Typography variant="caption" color={"red"}>
            ⚠ This field is required
          </Typography>
        )}

        <Controller
          name="middleName"
          control={control}
          render={() => (
            <TextField
              id="outlined-basic"
              label="middle name"
              variant="outlined"
              {...register("middleName", {
                required: false,
              })}
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
              {...register("lastName", {
                required: true,
              })}
              placeholder="Presley"
            />
          )}
        />

        {errors?.lastName?.type === "required" && (
          <Typography variant="caption" color={"red"}>
            ⚠ This field is required
          </Typography>
        )}

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
          name="phone"
          control={control}
          render={() => (
            <TextField
              id="outlined-basic"
              label="phone"
              variant="outlined"
              {...register("phone", {
                required: true,
                pattern: phoneRegExp,
              })}
              placeholder="+375 XX XXX XX XX"
            />
          )}
        />

        {errors?.phone?.type === "required" && (
          <Typography variant="caption" color={"red"}>
            ⚠ This field is required
          </Typography>
        )}
        {errors?.phone?.type === "pattern" && (
          <Typography variant="caption" color={"red"}>
            ⚠ Entered value does not match phone format
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

        {/* {errors?.password?.type === "required" && (
          <Typography variant="caption" color={"red"}>
            ⚠ This field is required
          </Typography>
        )}
        {errors?.password?.type === "minLength" && (
          <Typography variant="caption" color={"red"}>
            ⚠ Min length is 5
          </Typography>
        )} */}

        <Controller
          name="confirmPassword"
          control={control}
          render={() => (
            <TextField
              id="outlined-basic"
              label="confirm password"
              variant="outlined"
              {...register("confirmPassword", {
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

        {errors?.confirmPassword?.type === "required" && (
          <Typography variant="caption" color={"red"}>
            ⚠ This field is required
          </Typography>
        )}
        {errors?.confirmPassword?.type === "minLength" && (
          <Typography variant="caption" color={"red"}>
            ⚠ Your passwords do not match
          </Typography>
        )}

        <Button type="submit" disabled={!isValid} variant="contained">
          Sign Up
        </Button>
      </form>
    </Paper>
  );
};

export default SignUpForm;
