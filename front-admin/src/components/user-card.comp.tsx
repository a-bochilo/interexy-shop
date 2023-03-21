// ========================== react ==========================
import { FC, useState } from "react";
import { Navigate } from "react-router-dom";

// ========================== mui ==========================
import { Button, Card, CardContent, Container } from "@mui/material";
import { UserDto } from "../app/users/types/user-dto.type";

type UserProps = {
  user: UserDto;
};

export const UserCard: FC<UserProps> = ({ user }) => {
  const [userId, setUserId] = useState<null | string>();
  const handleClick = (id: string) => {
    setUserId(id);
  };

  // react hook form и в ней mui компоненты из таблицы

  return (
    <Container>
      <Card key={user.id} sx={{ width: 250 }}>
        <CardContent>
          {userId && <Navigate to={`/${userId}`} />}

          <Button onClick={() => handleClick(user.id)} size="small">
            {user.email}
          </Button>
          <p>{user.phone}</p>
          <p>{user.roleType}</p>
        </CardContent>
      </Card>
    </Container>
  );
};
