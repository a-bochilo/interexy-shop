import { UserSignUpDto } from "../../dtos/user-sign-up.dto";

export const UserSignUpStub = (): UserSignUpDto => {
    return {
        email: "testmock@test.com", 
        password: "123123123",
        phone: "123-123-123",
        details: {
            firstname: "firstname",
            lastname: "lastname",
            middlename: "middlename",
        }
    }
}