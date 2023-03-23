// ========================== react ==========================
import { FC } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

// ========================== moment ==========================
import moment from "moment";

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
import { formSchema } from "./login-form.const";

// ========================== enum ==========================
import { UserRoles } from "../app/roles/enums/user-roles.enum";
import { UserDetailsDto } from "../app/users/types/user-details.type";
import { UserDto } from "../app/users/types/user-dto.type";

interface IUserWithDetails {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
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
}

const userRoles = [
  {
    id: "1",
    name: "superadmin",
  },
  {
    id: "2",
    name: "admin",
  },
  {
    id: "3",
    name: "user",
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
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IUserWithDetails>({
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<IUserWithDetails> = (data) => {
    console.log(data);
    handleSave(data);
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
                value={selectedUser?.id}
                size="small"
                id="outlined-basic"
                variant="outlined"
                {...register("email")}
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
            name="firstName"
            control={control}
            render={() => (
              <TextField
                sx={{
                  width: "100%",
                  alignSelf: "right",
                }}
                disabled={disabled}
                value={userInfo?.firstname}
                id="outlined-basic"
                variant="outlined"
                {...register("firstName")}
              />
            )}
          />

          <Typography variant="caption" color={"red"}>
            {errors.firstName?.message}
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
            name="middleName"
            control={control}
            render={() => (
              <TextField
                sx={{
                  width: "100%",
                  alignSelf: "right",
                }}
                disabled={disabled}
                value={userInfo?.middlename}
                id="outlined-basic"
                variant="outlined"
                {...register("middleName")}
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
            name="lastName"
            control={control}
            render={() => (
              <TextField
                sx={{
                  width: "100%",
                  alignSelf: "right",
                }}
                disabled={disabled}
                value={userInfo?.lastname}
                id="outlined-basic"
                variant="outlined"
                {...register("lastName")}
              />
            )}
          />

          <Typography variant="caption" color={"red"}>
            {errors.lastName?.message}
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
                value={selectedUser?.email}
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
                value={selectedUser?.phone}
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
                value={moment(selectedUser?.created).format("DD/MM/YYYY")}
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
                value={moment(selectedUser?.updated).format("DD/MM/YYYY")}
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
                disabled={disabled}
                id="outlined-select"
                select
                defaultValue={UserRoles.superadmin}
                variant="outlined"
                {...register("roleId")}
              >
                {userRoles.map((role) => (
                  <MenuItem key={role.id} value={role.name}>
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
                disabled={disabled}
                id="outlined-select"
                select
                defaultValue={UserRoles.superadmin}
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
                defaultValue={true}
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
            {disabled ? (
              <Button
                type="submit"
                onClick={buttonOnclick}
                color="success"
                variant="contained"
              >
                Edit
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={!isValid}
                color="success"
                variant="contained"
              >
                Save
              </Button>
            )}

            <Button
              type="submit"
              onClick={() => handleDelete(selectedUser.id)}
              color="error"
              variant="contained"
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
