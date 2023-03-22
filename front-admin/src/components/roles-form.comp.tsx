// ========================== react ==========================
import { FC, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// ========================== yup ==========================
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "./login-form.const";

// ========================== mui ==========================
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, Paper, Typography } from "@mui/material";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { UserPermissions } from "../app/roles/types/user-permissions.enum";
import { UserRoles } from "../app/roles/types/user-roles.enum";
import { RolesDto } from "../app/roles/types/roles.dto";

interface IFormInput {
  id: number;
  created: string;
  updated: string;
  type: UserRoles;
  name: string;
  permissions: UserPermissions[];
}

const RoleForm = ({ role }: { role: RolesDto }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState(false);

  const [edit, setEdit] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormInput>({
    defaultValues: {
      id: 0,
      type: UserRoles.user,
      name: "",
      permissions: [],
    },
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
  };

  return (
    <Paper
      sx={{
        minWidth: 400,
        minHeight: 340,
        backgroundColor: "#f0f8ff",
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
          name="id"
          control={control}
          render={() => (
            <TextField
              disabled={!edit}
              value={role?.id}
              id="outlined-basic"
              label="id"
              variant="outlined"
              {...register("id")}
            />
          )}
        />

        <Controller
          name="name"
          control={control}
          render={() => (
            <TextField
              disabled={!edit}
              value={role?.name}
              id="outlined-basic"
              label="name"
              variant="outlined"
              {...register("name")}
            />
          )}
        />

        <Controller
          name="type"
          control={control}
          render={() => (
            <TextField
              disabled={!edit}
              value={role?.type}
              id="outlined-basic"
              label="type"
              variant="outlined"
              {...register("type")}
            />
          )}
        />

        <Controller
          name="permissions"
          control={control}
          render={() => (
            <TextField
              disabled={!edit}
              value={role?.permissions}
              id="outlined-basic"
              variant="outlined"
              {...register("permissions")}
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          color="success"
          onClick={() => setEdit(!edit)}
        >
          {edit ? `SAVE` : `EDIT`}
        </Button>

        <Button type="submit" variant="contained" color="error">
          DELETE
        </Button>
      </form>
    </Paper>
  );
};

export default RoleForm;
