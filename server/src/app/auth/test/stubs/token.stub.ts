import { TokenDto } from "../../../security/dtos/token.dto";

export const tokenStub = (): TokenDto => {
    return { token: "token_stub" };
};
