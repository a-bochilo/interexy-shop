// ========================== react ==========================================
import { useForm, SubmitHandler, Controller } from "react-hook-form";

// =========================== yup ===========================================
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "./roles-form.const";

// =========================== mui ===========================================
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";

// =========================== enums ==========================================
import { UserPermissions } from "../app/roles/types/user-permissions.enum";
import { UserRoles } from "../app/roles/types/user-roles.enum";

// =========================== interfaces & dto's =============================
import { CreateRoleDto } from "../app/roles/types/create-role.dto";

// =========================== component ======================================
import TemporaryTypography from "./temporary-typography.component";

interface IFormInput {
  id: number;
  type: UserRoles;
  name: string;
  permissions: UserPermissions[];
}

const CreateRoleForm = ({
  handleCreate,
  handleBack,
  fetchErrors,
  fetchingPending,
  isClicked,
}: {
  handleCreate: (s: CreateRoleDto) => void;
  handleBack: () => void;
  fetchErrors: string | null;
  fetchingPending: boolean;
  isClicked: boolean;
}) => {
  const enumsRoleTypes = Object.keys(UserRoles).slice(1);

  const enumsRolePermissions = Object.keys(UserPermissions);

  const {
    register,
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<IFormInput>({
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) =>
    handleCreate(data);

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
                defaultValue={null}
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

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {fetchingPending && <CircularProgress data-testid="pending-stub" />}

          {fetchErrors && (
            <TemporaryTypography
              variant="overline"
              align="center"
              color="error"
              duration={10}
            >
              {fetchErrors}
            </TemporaryTypography>
          )}

          {isClicked && !fetchErrors && (
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
                <CheckCircleIcon data-testid="done-stub" />
                <Typography>Role created</Typography>
              </Box>
            </TemporaryTypography>
          )}
        </Box>

        <Button
          sx={{
            width: "100%",
          }}
          data-testid="create-btn"
          id="createRoleButton"
          type="submit"
          variant="contained"
          color="success"
          placeholder="createRoleButton"
          disabled={!isValid}
        >
          CREATE
        </Button>
        <Button
          sx={{
            width: "100%",
          }}
          id="backToRolesButton"
          variant="contained"
          color="primary"
          placeholder="backToRolesButton"
          onClick={handleBack}
        >
          BACK TO ROLES
        </Button>
      </form>
    </Paper>
  );
};

export default CreateRoleForm;
