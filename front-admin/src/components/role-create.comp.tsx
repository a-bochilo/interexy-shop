// ========================== react ==========================
import { useForm, SubmitHandler, Controller } from "react-hook-form";

// ========================== yup ==========================
import { yupResolver } from "@hookform/resolvers/yup";

// ========================== mui ==========================
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControl,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { UserPermissions } from "../app/roles/types/user-permissions.enum";
import { UserRoles } from "../app/roles/types/user-roles.enum";
import { RolesDto } from "../app/roles/types/roles.dto";
import { formCreateSchema } from "../app/roles/types/roles-form.const";

interface IFormInput {
  id: number;
  type: UserRoles;
  name: string;
  permissions: UserPermissions[];
}

const CreateRoleForm = ({
  handleCreate,
  handleBack,
}: {
  handleCreate: (s: RolesDto) => void;
  handleBack: () => void;
}) => {
  const enumsRoleTypes = Object.keys(UserRoles).slice(1);

  const enumsRolePermissions = Object.keys(UserPermissions);

  const { register, control, handleSubmit } = useForm<IFormInput>({
    mode: "onChange",
    resolver: yupResolver(formCreateSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    handleCreate(data);
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
        Create role
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
            Name:{" "}
          </Typography>

          <Controller
            name="name"
            control={control}
            render={() => (
              <TextField
                sx={{
                  width: "100%",
                }}
                defaultValue={""}
                id="name"
                variant="standard"
                {...register("name")}
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
            Type:{" "}
          </Typography>

          <Controller
            name="type"
            control={control}
            render={() => (
              <Select
                labelId="demo-simple-select-label"
                id="type"
                defaultValue={UserRoles.user}
                label="Type"
                variant="standard"
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

            {enumsRolePermissions.map((item: string, index: number) => {
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
                        defaultChecked={false}
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

        <Button
          sx={{
            width: "100%",
          }}
          type="submit"
          variant="contained"
          color="success"
        >
          CREATE
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
      </form>
    </Paper>
  );
};

export default CreateRoleForm;
