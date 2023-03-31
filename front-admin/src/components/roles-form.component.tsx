// =========================== react =======================================
import { useForm, SubmitHandler, Controller } from "react-hook-form";

// =========================== yup =========================================
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "./roles-form.const";

// =========================== mui =========================================
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";

// =========================== enums =========================================
import { UserPermissions } from "../app/roles/types/user-permissions.enum";
import { UserRoles } from "../app/roles/types/user-roles.enum";

// =========================== interfaces & dto's ============================
import { RolesDto } from "../app/roles/types/roles.dto";
import { IRoleState } from "../app/roles/types/role-state.interface";

// =========================== component ======================================
import TemporaryTypography from "./temporary-typography.component";

interface IFormInput {
  id: number;
  type: UserRoles;
  name: string;
  created: string;
  updated: string;
  permissions: UserPermissions[];
}

const RoleForm = ({
  role,
  pending,
  fetchingErrors,
  isEditable,
  isClicked,
  handleDelete,
  handleSave,
  handleBack,
  setIsEditable,
}: {
  role: RolesDto;
  isEditable: boolean;
  pending: IRoleState["pending"];
  fetchingErrors: IRoleState["errors"];
  isClicked: boolean;
  handleDelete: (s: number) => void;
  handleSave: (s: RolesDto) => void;
  handleBack: () => void;
  setIsEditable: (s: boolean) => void;
}) => {
  const permissions = [role?.permissions].flat();

  const enumsRoleTypes = Object.keys(UserRoles).slice(1);

  const enumsRolePermissions = Object.keys(UserPermissions);

  let isEnougth = enumsRolePermissions.map((item) => {
    if (permissions.includes(item as UserPermissions)) return true;
    return false;
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormInput>({
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    handleSave({
      ...data,
      id: role.id,
    });
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
      <Typography variant="h6" fontWeight={"bold"} pb={1}>
        Edit role: {role?.name}
      </Typography>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        <FormControl
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              minWidth: "150px",
            }}
          >
            ID:
          </Typography>

          <Controller
            name="id"
            control={control}
            render={() => (
              <TextField
                sx={{
                  width: "100%",
                }}
                disabled={true}
                value={role?.id ?? null}
                id="id"
                variant="standard"
                {...register("id")}
              />
            )}
          />
        </FormControl>

        <FormControl
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              minWidth: "150px",
            }}
          >
            Name:{" "}
          </Typography>

          <Controller
            name="name"
            control={control}
            render={() => (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <Typography
                  variant="caption"
                  color={"red"}
                  display={isEditable ? "block" : "none"}
                >
                  {errors.name?.message}
                </Typography>
                <TextField
                  sx={{
                    width: "100%",
                  }}
                  disabled={!isEditable}
                  defaultValue={role?.name ?? null}
                  id="standard-basic"
                  variant="standard"
                  {...register("name")}
                />
              </Box>
            )}
          />
        </FormControl>

        <FormControl
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              minWidth: "150px",
            }}
          >
            Type:{" "}
          </Typography>

          <Controller
            name="type"
            control={control}
            render={() => (
              <Select
                labelId="demo-simple-select-label"
                id="type"
                defaultValue={role?.type ?? null}
                label="Type"
                variant="standard"
                disabled={!isEditable}
                sx={{
                  width: "100%",
                }}
                {...register("type")}
              >
                {enumsRoleTypes.map((item) => {
                  return (
                    <MenuItem value={item} key={item}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
            )}
          />
        </FormControl>

        <FormControl
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            alignItems: "top",
          }}
        >
          <Typography
            sx={{
              marginTop: "8px",
              minWidth: "150px",
            }}
          >
            Permissions:
          </Typography>

          <Accordion
            variant="outlined"
            disabled={!isEditable}
            sx={{
              width: "100%",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Permissions</Typography>
            </AccordionSummary>

            {isEnougth.map((item: boolean, index: number) => {
              return (
                <AccordionDetails
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    padding: "8px",
                    gap: "8px",
                    alignItems: "center",
                  }}
                >
                  <Controller
                    name="permissions"
                    control={control}
                    render={() => (
                      <Checkbox
                        id={enumsRolePermissions[index]}
                        disabled={!isEditable}
                        defaultChecked={item}
                        value={enumsRolePermissions[index]}
                        color="success"
                        {...register("permissions")}
                      />
                    )}
                  />
                  <Typography>{enumsRolePermissions[index]}</Typography>
                </AccordionDetails>
              );
            })}
          </Accordion>
        </FormControl>

        {fetchingErrors.chosenRole && (
          <TemporaryTypography
            variant="overline"
            align="center"
            color="error"
            duration={10}
          >
            {fetchingErrors.chosenRole}
          </TemporaryTypography>
        )}

        {isClicked && !fetchingErrors.chosenRole && (
          <TemporaryTypography
            variant="overline"
            align="center"
            color="success.light"
            duration={10}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "8px",
                justifyContent: "center",
              }}
            >
              <CheckCircleIcon />
              <Typography>Role updated</Typography>
            </Box>
          </TemporaryTypography>
        )}

        <Box
          sx={{
            display: "flex",
            flexFlow: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            marginTop: "50px",
            gap: 2,
          }}
        >
          <Button
            sx={{
              width: "100%",
              display: isEditable ? "none" : null,
            }}
            variant="contained"
            color="success"
            disabled={isEditable}
            onClick={() => {
              setIsEditable(!isEditable);
            }}
          >
            EDIT
          </Button>

          <Button
            sx={{
              width: "100%",
              display: !isEditable ? "none" : null,
            }}
            type="submit"
            variant="contained"
            color="success"
            disabled={!isValid}
            onClick={() => {
              setIsEditable(!isEditable);
            }}
          >
            SAVE
          </Button>

          <Button
            variant="contained"
            color="error"
            sx={{
              width: "100%",
            }}
            onClick={() => handleDelete(role.id)}
          >
            DELETE
          </Button>

          <Button
            sx={{
              width: "100%",
            }}
            variant="contained"
            color="primary"
            onClick={handleBack}
          >
            BACK TO ROLES
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default RoleForm;
