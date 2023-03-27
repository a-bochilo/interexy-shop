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
import { UserRoles } from "../app/roles/types/user-roles.enum";
import { UserDetailsDto } from "../app/users/types/user-details.type";
import { UserDto } from "../app/users/types/user-dto.type";

interface IUserWithDetails {
  id: string;
  firstname: string;
  lastname: string;
  middlename: string;
  created: string;
  updated: string;
  email: string;
  password: string;
  phone: string;
  roleId: number;
  roleType: UserRoles;
  isActive: boolean;
}

interface FormProps {
  formName: string;
  selectedUser: UserDto;
  userInfo: UserDetailsDto;
  disabled: boolean;
  pending: boolean;
  setDisabled: (e: boolean) => void;
  buttonOnclick: () => void;
  handleSave: (e: Partial<IUserWithDetails>) => void;
  handleDelete: (e: string) => void;
  handleBack: () => void;
  handleAsignRole: () => void;
}

const userRoles = [
  {
    id: "1",
    name: "superadmin",
  },
  {
    id: "2",
    name: "user",
  },
  {
    id: "3",
    name: "admin",
  },
];

const userStatuses = [
  {
    id: "1",
    name: "true",
  },
  {
    id: "2",
    name: "false",
  },
];

const dateFormat = (date: number) => {
  return new Date(date);
}

const UserEditFormComp: FC<FormProps> = ({
  formName,
  userInfo,
  selectedUser,
  disabled,
  pending,
  setDisabled,
  buttonOnclick,
  handleSave,
  handleDelete,
  handleBack,
  handleAsignRole,
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
    const { firstname, lastname, middlename, ...user } = notNullFields;
    const info = removeEmptyFields({ firstname, lastname, middlename });

    const outputData = {
      id: selectedUser.id,
      email: selectedUser.email,
      phone: selectedUser.phone,
      roleId: selectedUser.roleId,
      roleType: selectedUser.roleType,
      isActive: selectedUser.isActive,
      ...user,
      details: info,
    };
    console.log("submit");
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
            id
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
            middle name
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
                defaultValue={selectedUser?.email}
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
                defaultValue={selectedUser?.phone}
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
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="overline"
            align="left"
            sx={{ minWidth: 90, width: 120 }}
          >
            created
          </Typography>
          <Controller
            name="created"
            control={control}
            render={() => (
              <TextField
                sx={{
                  width: "100%",
                  alignSelf: "right",
                }}
                disabled
                defaultValue={dateFormat(selectedUser.created)}
                id="outlined-basic"
                variant="outlined"
                {...register("created")}
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
            updated
          </Typography>
          <Controller
            name="updated"
            control={control}
            render={() => (
              <TextField
                sx={{
                  width: "100%",
                  alignSelf: "right",
                }}
                disabled
                defaultValue={dateFormat(selectedUser.updated)}
                id="outlined-basic"
                variant="outlined"
                {...register("updated")}
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
            role id
          </Typography>
          <Controller
            name="roleId"
            control={control}
            render={() => (
              <TextField
                sx={{
                  width: "100%",
                  alignSelf: "right",
                }}
                disabled
                id="outlined-select"
                select
                defaultValue={selectedUser.roleId}
                variant="outlined"
                {...register("roleId")}
              >
                {userRoles.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.id}
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
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="overline"
            align="left"
            sx={{ minWidth: 90, width: 120 }}
          >
            role type
          </Typography>
          <Controller
            name="roleType"
            control={control}
            render={() => (
              <TextField
                sx={{
                  width: "100%",
                  alignSelf: "right",
                }}
                disabled
                id="outlined-select"
                select
                defaultValue={selectedUser.roleType}
                variant="outlined"
                {...register("roleType")}
              >
                {userRoles.map((role) => (
                  <MenuItem key={role.id} value={role.name}>
                    {role.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Typography variant="caption" color={"red"}>
            {errors.roleType?.message}
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
            is Active
          </Typography>
          <Controller
            name="isActive"
            control={control}
            render={() => (
              <TextField
                sx={{
                  width: "100%",
                  alignSelf: "right",
                }}
                disabled={disabled}
                id="outlined-select"
                select
                defaultValue={selectedUser.isActive}
                variant="outlined"
                {...register("isActive")}
              >
                {userStatuses.map((role) => (
                  <MenuItem key={role.id} value={role.name}>
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
              onClick={handleAsignRole}
              variant="contained"
            >
              Assign role
            </Button>

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

            <Button
              sx={{
                width: "100%",
              }}
              type="submit"
              onClick={() => handleDelete(selectedUser.id)}
              color="error"
              variant="outlined"
            >
              Delete
            </Button>
          </Box>
        </Box>
      </form>
    </Paper>
  );
};

export default UserEditFormComp;
