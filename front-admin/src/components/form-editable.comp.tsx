// ========================== react ==========================
import { FC, useState, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// ========================== mui ==========================
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { MenuItem, Paper, Typography } from "@mui/material";

// ========================== yup ==========================
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "./login-form.const";

// ========================== store ==========================
import { getUserInfo, getUsers } from "../app/users/store/users.actions";
import {
  userSelector,
  usersSelector,
} from "../app/users/store/users.selectors";
import { AppDispatch } from "../store";

// ========================== enum ==========================
import { UserRoles } from "../app/roles/enums/user-roles.enum";
import { UserStatuses } from "../app/users/enums/user-statuses.enum";

interface IFormInput {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  created: number;
  updated: number;
  email: string;
  password: string;
  phone: string;
  roleId: number;
  roleType: UserRoles;
  status: UserStatuses;
}

interface FormProps {
  formName: string;
}

interface userListProps {
  id: string;
  created: number;
  updated: number;
  email: string;
  password: string;
  phone: string;
  roleId: number;
  roleType: UserRoles;
  status: UserStatuses;
}

interface userInfoProps {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  created: number;
  updated: number;
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
    name: "active",
  },
  {
    id: "2",
    name: "inactive",
  },
];

const FormEditableComp: FC<FormProps> = ({ formName }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormInput>({
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector(userSelector);
  const userList = useSelector(usersSelector);
  const { userId } = useParams<string>();

  useEffect(() => {
    if (!userId) return;
    dispatch(getUserInfo(userId));
  }, [userId]);

  useEffect(() => {
    dispatch(getUsers());
  });

  const buttonOnclick = () => {
    setDisabled(false);
  };

  const selectedUser = userList.find(
    (user) => user.details_id === userInfo!.id
  );

  return (
    <Paper
      sx={{
        minWidth: 600,
        height: 1140,
        backgroundColor: "lightyellow",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Typography variant="h5" fontWeight={"bold"} pb={3}>
        {formName}
      </Typography>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: 20 }}
      >
        <Controller
          name="id"
          control={control}
          render={() => (
            <TextField
              disabled
              value={selectedUser?.id}
              id="outlined-basic"
              label="id"
              variant="outlined"
              {...register("email")}
              placeholder="example@gmail.com"
            />
          )}
        />

        <Controller
          name="firstName"
          control={control}
          render={() => (
            <TextField
              disabled={disabled}
              value={userInfo?.firstname}
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
              disabled={disabled}
              value={userInfo?.middlename}
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
              disabled={disabled}
              value={userInfo?.lastname}
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
              disabled={disabled}
              value={selectedUser?.email}
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
              disabled={disabled}
              value={selectedUser?.phone}
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
          name="created"
          control={control}
          render={() => (
            <TextField
              disabled
              value={selectedUser?.created}
              id="outlined-basic"
              label="created"
              variant="outlined"
              {...register("created")}
              placeholder="2023 03 21"
            />
          )}
        />

        <Typography variant="caption" color={"red"}>
          {errors.created?.message}
        </Typography>

        <Controller
          name="updated"
          control={control}
          render={() => (
            <TextField
              disabled
              value={selectedUser?.update}
              id="outlined-basic"
              label="updated"
              variant="outlined"
              {...register("updated")}
              placeholder="2023 03 30"
            />
          )}
        />

        <Typography variant="caption" color={"red"}>
          {errors.updated?.message}
        </Typography>

        <Controller
          name="roleId"
          control={control}
          render={() => (
            <TextField
              disabled={disabled}
              id="outlined-select"
              select
              defaultValue={UserRoles.superadmin}
              label="role id"
              variant="outlined"
              {...register("roleId")}
              placeholder="1"
            >
              {userRoles.map((role) => (
                <MenuItem key={role.id} value={role.name}>
                  {role.id}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Controller
          name="roleType"
          control={control}
          render={() => (
            <TextField
              disabled={disabled}
              id="outlined-select"
              select
              defaultValue={UserRoles.superadmin}
              label="role type"
              variant="outlined"
              {...register("roleType")}
              placeholder="user"
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

        <Controller
          name="status"
          control={control}
          render={() => (
            <TextField
              disabled={disabled}
              id="outlined-select"
              select
              defaultValue={UserStatuses.Active}
              label="status"
              variant="outlined"
              {...register("status")}
              placeholder="active"
            >
              {userStatuses.map((role) => (
                <MenuItem key={role.id} value={role.name}>
                  {role.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        {disabled ? (
          <Button type="submit" onClick={buttonOnclick} variant="contained">
            Edit
          </Button>
        ) : (
          <Button type="submit" disabled={!isValid} variant="contained">
            Save
          </Button>
        )}

        <Button
          type="submit"
          onClick={() => alert("user deleted!")}
          variant="contained"
        >
          Delete
        </Button>
      </form>
    </Paper>
  );
};

export default FormEditableComp;
