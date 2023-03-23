// ========================== react ==========================
import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

// ========================== yup ==========================
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "./login-form.const";

// ========================== mui ==========================
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";

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
  const [edit, setEdit] = useState(false);
  const [permissions, setPermissions] = useState([role?.permissions].flat());

  const [type, setType] = useState("");
  const [name, setName] = useState("");

  const enumsRoleTypes = Object.keys(UserRoles);

  const enumsRolePermissions = Object.keys(UserPermissions);

  let isEnougth = enumsRolePermissions.map((item) => {
    if (permissions.includes(item as UserPermissions)) return true;
    return false;
  });

  const handleChangeRolePermissions = (index: number) => {
    isEnougth[index] ? (isEnougth[index] = false) : (isEnougth[index] = true);
  };

  const { register, control, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      id: +role.id,
      type: role.type,
      name: role.name,
      permissions: role.permissions,
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
        width: "90%",
        maxWidth: 800,
        backgroundColor: "#f0f8ff",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Typography variant="h5" fontWeight={"bold"} pb={3}>
        Edit role: {role.name}
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
              disabled={true}
              defaultValue={role.id}
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
              disabled={edit}
              defaultValue={role.name}
              id="outlined-basic"
              variant="outlined"
              {...register("name")}
            />
          )}
        />

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue={role.type}
            label="Type"
            //onChange={handleChangeRoleType}
            disabled={!edit}
          >
            {enumsRoleTypes.map((item, index) => {
              return (
                <MenuItem value={role.type} key={index}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Permissions</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Permissions"
            //onChange={handleChangeRoleType}
            disabled={edit}
          >
            {isEnougth.map((item, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    padding: "8px",
                    gap: "8px",
                  }}
                >
                  <MenuItem value={role.type} key={index}>
                    <Checkbox
                      disabled={edit}
                      defaultChecked={item}
                      onChange={() => handleChangeRolePermissions(index)}
                      color="success"
                    />
                    <Typography>{enumsRolePermissions[index]}</Typography>
                  </MenuItem>
                </Box>
              );
            })}
          </Select>
        </FormControl>

        {/* <Box>
          {isEnougth.map((item, index) => {
            return (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  padding: "8px",
                  gap: "8px",
                }}
              >
                <Checkbox
                  disabled={edit}
                  defaultChecked={item}
                  onChange={() => handleChangeRolePermissions(index)}
                  color="success"
                />
                <Typography>{enumsRolePermissions[index]}</Typography>
              </Box>
            );
          })}
        </Box> */}

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
