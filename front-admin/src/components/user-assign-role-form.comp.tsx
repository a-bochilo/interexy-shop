// ========================== react ==========================
import { FC } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

// ========================== mui ==========================
import {
  Box,
  MenuItem,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";

// ========================== enum ==========================
import { RolesDto } from "../app/roles/types/roles.dto";
import { UserState } from "../app/users/types/user-state.type";
import { UserRoles } from "../app/roles/types/user-roles.enum";

// ========================== components ==========================
import TemporaryTypography from "./temporary-typography.component";

// ========================== interfaces ==========================
interface IUserAssignRole {
  id: string;
  name: string;
}

interface FormProps {
  formName: string;
  userId: string;
  isClicked: boolean;
  selectedUserRole: RolesDto;
  userRoles: RolesDto[];
  disabled: boolean;
  pending: UserState["pending"];
  setDisabled: (e: boolean) => void;
  buttonOnclick: () => void;
  handleSave: (e: IUserAssignRole) => void;
  handleBack: () => void;
}

const enumsRoleTypes = Object.keys(UserRoles).slice(1);

const UserAssignRoleFormComp: FC<FormProps> = ({
  formName,
  userRoles,
  userId,
  isClicked,
  selectedUserRole,
  disabled,
  pending,
  setDisabled,
  buttonOnclick,
  handleSave,
  handleBack,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<IUserAssignRole>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IUserAssignRole> = (data) => {
    const userWithNewRole = {
      ...data,
      id: userId,
    };
    handleSave(userWithNewRole);
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
        {/*============================ user id field ===================================*/}
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
                disabled={true}
                size="small"
                value={userId ? userId : null}
                id="id"
                variant="outlined"
                {...register("id")}
              />
            )}
          />
        </Box>
        {/*============================ role name field ===================================*/}
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
                defaultValue={selectedUserRole.name}
                variant="outlined"
                {...register("name")}
              >
                {enumsRoleTypes.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
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
          {/*============================ conditions block ===================================*/}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "50%",
            }}
          >
            {isClicked && !pending.users && (
              <TemporaryTypography
                variant="overline"
                align="center"
                color="success.main"
                duration={2}
                data-testid="done-icon-test"
              >
                <DoneIcon />
              </TemporaryTypography>
            )}
          </Box>
          {/*============================ buttons block ===================================*/}
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
              onClick={buttonOnclick}
              disabled={!isValid}
              color="success"
              variant="contained"
              form="userAssignRole"
              data-testid="save-btn"
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
