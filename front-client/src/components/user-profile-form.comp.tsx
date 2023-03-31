// ========================== react ==========================
import { FC } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

// ========================== mui ==========================
import {
  Box,
  CircularProgress,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";

// ========================== yup ==========================
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "./user-profile-form.const";

// ========================== enums & types =================
import { UserDetailsDto } from "../app/users/types/user-details.type";
import { UserDto } from "../app/users/types/user-dto.type";
import { UserState } from "../app/users/types/user-state.type";

interface IUserWithDetails {
  firstname: string;
  lastname: string;
  middlename: string;
  email: string;
  phone: string;
}

interface FormProps {
  formName: string;
  user: UserDto;
  userInfo: UserDetailsDto;
  disabled: boolean;
  pending: UserState["pending"];
  setDisabled: (e: boolean) => void;
  buttonOnclick: () => void;
  handleSave: (e: Partial<IUserWithDetails>) => void;
  handleBack: () => void;
}

const UserProfileFormComp: FC<FormProps> = ({
  formName,
  user,
  userInfo,
  disabled,
  pending,
  setDisabled,
  buttonOnclick,
  handleSave,
  handleBack,
}) => {
  const removeEmptyFields = (
    obj: Partial<IUserWithDetails>
  ): Partial<IUserWithDetails> => {
    const newObj = Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => v !== (null || undefined))
    );
    return newObj as Partial<IUserWithDetails>;
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IUserWithDetails>({
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<Partial<IUserWithDetails>> = (data) => {
    const notNullFields = removeEmptyFields(data);
    const { firstname, lastname, middlename, ...userFullData } = notNullFields;
    const info = removeEmptyFields({ firstname, lastname, middlename });

    const outputData = {
      email: user.email,
      phone: user.phone,
      ...userFullData,
      details: info,
    };
    handleSave(outputData);
    setDisabled(!disabled);
  };

  return (
    <Paper
      sx={{
        width: "90%",
        maxWidth: 800,
        backgroundColor: "primary.light",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Typography variant="h6" fontWeight={"bold"} pb={1}>
        {formName}
      </Typography>

      <form
        id="userEdit"
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="overline"
            align="left"
            sx={{ minWidth: 90, width: 120 }}
          >
            first name
          </Typography>

          <Controller
            name="firstname"
            control={control}
            render={() => (
              <TextField
                sx={{
                  width: "100%",
                  alignSelf: "right",
                }}
                disabled={disabled}
                defaultValue={userInfo?.firstname}
                id="outlined-basic"
                variant="outlined"
                {...register("firstname")}
              />
            )}
          />

          <Typography variant="caption" color={"red"}>
            {errors.firstname?.message}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="overline"
            align="left"
            sx={{ minWidth: 90, width: 120 }}
          >
            M iddle name
          </Typography>
          <Controller
            control={control}
            name="middlename"
            render={() => (
              <TextField
                sx={{
                  width: "100%",
                  alignSelf: "right",
                }}
                disabled={disabled}
                defaultValue={userInfo?.middlename}
                id="outlined-basic"
                variant="outlined"
                {...register("middlename")}
              />
            )}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="overline"
            align="left"
            sx={{ minWidth: 90, width: 120 }}
          >
            last name
          </Typography>
          <Controller
            name="lastname"
            control={control}
            render={() => (
              <TextField
                sx={{
                  width: "100%",
                  alignSelf: "right",
                }}
                disabled={disabled}
                defaultValue={userInfo?.lastname}
                id="outlined-basic"
                variant="outlined"
                {...register("lastname")}
              />
            )}
          />

          <Typography variant="caption" color={"red"}>
            {errors.lastname?.message}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="overline"
            align="left"
            sx={{ minWidth: 90, width: 120 }}
          >
            email
          </Typography>
          <Controller
            name="email"
            control={control}
            render={() => (
              <TextField
                sx={{
                  width: "100%",
                  alignSelf: "right",
                }}
                disabled={disabled}
                defaultValue={user.email}
                id="outlined-basic"
                variant="outlined"
                {...register("email")}
              />
            )}
          />

          <Typography variant="caption" color={"red"}>
            {errors.email?.message}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="overline"
            align="left"
            sx={{ minWidth: 90, width: 120 }}
          >
            phone
          </Typography>
          <Controller
            name="phone"
            control={control}
            render={() => (
              <TextField
                sx={{
                  width: "100%",
                  alignSelf: "right",
                }}
                disabled={disabled}
                defaultValue={user.phone}
                id="outlined-basic"
                variant="outlined"
                {...register("phone")}
              />
            )}
          />

          <Typography variant="caption" color={"red"}>
            {errors.phone?.message}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "50%",
            }}
          >
            {pending && <CircularProgress data-testid="test-progress" />}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              gap: 2,
            }}
          >
            <Button
              sx={{
                width: "100%",
                display: !disabled ? "none" : null,
              }}
              onClick={buttonOnclick}
              color="success"
              variant="contained"
            >
              Edit
            </Button>

            <Button
              sx={{
                width: "100%",
                display: disabled ? "none" : null,
              }}
              type="submit"
              disabled={!isValid}
              color="success"
              variant="contained"
              form="userEdit"
            >
              Save
            </Button>

            <Button
              sx={{
                width: "100%",
              }}
              type="submit"
              onClick={handleBack}
              color="error"
              variant="contained"
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </form>
    </Paper>
  );
};

export default UserProfileFormComp;
