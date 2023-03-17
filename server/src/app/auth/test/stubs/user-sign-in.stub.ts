import { UserSignInDto } from "../../dtos/user-sign-in.dto";

export const UserSignInStub = (): UserSignInDto => {
    return {email: "testmock@test.com", password: "123123123"}
}