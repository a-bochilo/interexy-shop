// ========================== Nest ==========================
import { Test, TestingModule } from "@nestjs/testing";
import { ConfigModule } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { getRepositoryToken } from "@nestjs/typeorm";
import { BadRequestException } from "@nestjs/common";

// ========================== service ==========================
import { SecurityService } from "../../security/security.service";
import { AuthService } from "../auth.service";
import { UserService } from "./../../users/user.service";

// ========================== repository ==========================
import { UserRepository } from "../../users/repos/user.repository";
import { RoleRepository } from "./../../roles/repos/role.repository";
import { UserDetailsRepository } from "./../../users/repos/user-details.repository";
import { CartRepository } from "./../../cart/repos/cart.repository";

describe("AuthService methods", () => {
  let authService: AuthService;

  const user = {
    id: 1,
    email: "test@gmail.com",
    password: "123456789",
    phone: "375291234567",
    userRole: {
      permissions: ["sign-out"],
    },
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        JwtModule.register({
          secretOrPrivateKey: "Secret key",
        }),
      ],
      providers: [AuthService, SecurityService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(authService).toBeDefined();
  });
});
//   // describe("sign-in", () => {
//   //   describe("and if I have not been already registered", () => {
//   //     it("I expect to get error that User not found", () => {
//   //       expect(authService.signIn(UserSignInStub())).rejects.toThrow();
//   //     });
//   //   });
//   //   describe("and if I have been already registered, but password is incorrect", () => {
//   //     it("I expect to get error that password is wrong", () => {
//   //       expect(authService.signIn(UserSignInStub())).rejects.toThrow();
//   //     });
//   //   });
//   //   // describe("and if I have entered everything right", () => {
//   //   //   it("I expect to get token", () => {
//   //   //     console.log(UserSignInStub())
//   //   //     console.log(authService.signIn({
//   //   //         email: 'testmock@test.com',
//   //   //         password: '123123123'
//   //   //     }))
//   //   //     expect(authService.signIn(UserSignInStub())).toBe("token_string");
//   //   //   });
//   //   // });
//   // });
