// ========================== react ======================
import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

// ========================== mui =========================
import { Grid } from "@mui/material";
import styled from "@emotion/styled";
import { Button } from "@mui/material";

// ======================= components =====================
import UsersRoutes from "./users.routes";
import PageNavBarComp from "../../components/navbar.comp";
import PageAsideComp from "../../components/aside.comp";

// ========================== store =======================
import { AppDispatch } from "../../store";
import { getUsers, getAllUsers } from "./store/users.actions";

const MainGrid = styled(Grid)`
    display: flex;
    flex-direction: column;
    flex: 1 1 0;
    min-height: 100vh;
    padding-top: 64px;
    justify-content: space-between;
`;

const ContentGrid = styled(Grid)`
    display: flex;
    flex-grow: 1;
    min-width: 100%;
    min-height: 100%;
    justify-content: flex-end;
`;

const LoginPage: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { pathname } = useLocation();

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    return (
        <MainGrid>
            <PageNavBarComp />
            <ContentGrid
                sx={{ flexDirection: { xs: "column-reverse", md: "row" } }}
            >
                <UsersRoutes />
                {pathname === "/users" ? (
                    <PageAsideComp>
                        <Button
                            sx={{
                                width: "100%",
                            }}
                            onClick={() => dispatch(getUsers())}
                            color="success"
                            variant="contained"
                        >
                            Active users
                        </Button>
                        <Button
                            sx={{
                                width: "100%",
                            }}
                            onClick={() => dispatch(getAllUsers(false))}
                            color="success"
                            variant="contained"
                        >
                            Inactive users
                        </Button>
                    </PageAsideComp>
                ) : (
                    ""
                )}
            </ContentGrid>
        </MainGrid>
    );
};

export default LoginPage;
