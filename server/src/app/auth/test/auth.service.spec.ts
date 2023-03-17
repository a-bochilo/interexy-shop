import { Test } from "@nestjs/testing";

import { SecurityService } from "../../security/security.service";
import { UserRepository } from "../../users/repos/user.repository";
import { AuthService } from "../auth.service";
import { UserSignInStub } from "./stubs/user-sign-in.stub";
import { RoleRepository } from "../../roles/repos/role.repository";
import { UserDetailsRepository } from "../../users/repos/user-details.repository";
import { CartRepository } from "../../cart/repos/cart.repository";

jest.mock("../../users/repos/user.repository");
jest.mock("../../security/security.service");
jest.mock("../../roles/repos/role.repository");
jest.mock("../../users/repos/user-details.repository");
jest.mock("../../cart/repos/cart.repository");

describe("AuthService. As a user I want to", () => {
  let authService: AuthService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [],
      providers: [
        AuthService,
        UserRepository,
        SecurityService,
        RoleRepository,
        UserDetailsRepository,
        CartRepository,
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    userRepository = moduleRef.get<UserRepository>(UserRepository);

    jest.clearAllMocks();
  });

  describe("sign-in", () => {
    describe("and if I have not been already registred", () => {
      it("I expect to get error that User no found", () => {
        expect(authService.signIn(UserSignInStub())).rejects.toThrow();
      });
    });
    describe("and if I have been already registred, but password is incorrect", () => {
      it("I expect to get error that password is wrong", () => {
        expect(authService.signIn(UserSignInStub())).rejects.toThrow();
      });
    });
    describe("and if I have entered everything right", () => {
      it("I expect to get token", () => {
        console.log(UserSignInStub())
        console.log(authService.signIn({ 
            email: 'testmock@test.com', 
            password: '123123123' 
        }))
        //expect(authService.signIn(UserSignInStub())).toBe("token_string");
      });
    });
  });
});
