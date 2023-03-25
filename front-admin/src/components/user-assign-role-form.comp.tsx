// ========================== react ==========================
import { FC } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

// ========================== mui ==========================
import {
  Box,
  MenuItem,
  CircularProgress,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";

// ========================== yup ==========================
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "./user-edit-form.const";

// ========================== enum ==========================
import { UserDto } from "../app/users/types/user-dto.type";
import { RolesDto } from "../app/roles/types/roles.dto";

interface IUserAssignRole {
  id: string;
  name: string;
}

interface FormProps {
  formName: string;
  selectedUser: UserDto;
  selectedUserRole: RolesDto;
  userRoles: RolesDto[];
  disabled: boolean;
  pending: boolean;
  setDisabled: (e: boolean) => void;
  buttonOnclick: () => void;
  handleSave: (e: Partial<IUserAssignRole>) => void;
  handleBack: () => void;
}

const UserAssignRoleFormComp: FC<FormProps> = ({
  formName,
  userRoles,
  selectedUser,
  selectedUserRole,
  disabled,
  pending,
  setDisabled,
  buttonOnclick,
  handleSave,
  handleBack,
}) => {
  const removeEmptyFields = (
    obj: Partial<IUserAssignRole>
  ) => {
    const newObj = Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => v !== (null || undefined))
    );
    return newObj as Partial<IUserAssignRole>;
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IUserAssignRole>({
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<Partial<IUserAssignRole>> = (data) => {
    const notNullFields = removeEmptyFields(data);
    const { name, ...user } = notNullFields;

    const outputData = {
      id: selectedUser.id,
      name: selectedUserRole.name,
      
      ...user,
    };
    // console.log(outputData);
    // handleSave(outputData);
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
        id="userAssignRole"
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
            user id
          </Typography>
          <Controller
            name="id"
            control={control}
            render={() => (
              <TextField
                sx={{
                  width: "100%",
                  alignSelf: "right",
                }}
                disabled
                defaultValue={selectedUser?.id}
                size="small"
                id="outlined-basic"
                variant="outlined"
                {...register("id")}
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
            role name
          </Typography>
          <Controller
            name="name"
            control={control}
            render={() => (
              <TextField
                sx={{
                  width: "100%",
                  alignSelf: "right",
                }}
                disabled={!disabled}
                id="outlined-select"
                select
                defaultValue={selectedUserRole.id}
                variant="outlined"
                {...register("name")}
              >
                {userRoles.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
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
            {pending && <CircularProgress />}
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
              }}
              type="submit"
              disabled={!isValid}
              color="success"
              variant="contained"
              form="userAssignRole"
              onClick={buttonOnclick}
            >
              Save
            </Button>

            <Button
              sx={{
                width: "100%",
              }}
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

export default UserAssignRoleFormComp;
