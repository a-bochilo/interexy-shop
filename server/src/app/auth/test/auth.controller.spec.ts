import { TokenDto } from "src/app/security/dtos/token.dto";
import { AuthController } from "../auth.controller";
import { AuthService } from "../auth.service";
import { Test } from "@nestjs/testing";
import { tokenStub } from "./stubs/token.stub";
import { UserSignInStub } from "./stubs/user-sign-in.stub";

jest.mock("../auth.service");

describe("AuthController. As a user I want to", () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);

    jest.clearAllMocks();
  });

  describe("sign-in", () => {
    let token: TokenDto;

    beforeEach(async () => {
      token = await authController.signIn(UserSignInStub());
    });

    it("and controller should call auth.service", () => {
        expect(authService.signIn).toBeCalledWith(UserSignInStub());
    });

    it("and give me token back", () => {
      expect(token).toEqual(tokenStub());
    });
  });
});
