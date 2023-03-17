import { tokenStub } from "../test/stubs/token.stub";

export const AuthService = jest.fn().mockReturnValue({
    signIn: jest.fn().mockResolvedValue(tokenStub()),
    signUp: jest.fn().mockResolvedValue(tokenStub()),
});

