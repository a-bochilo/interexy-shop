// ========================== Nest ==========================
import { JwtModule, JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import { ConfigModule } from "@nestjs/config";
import { BadRequestException } from "@nestjs/common";

// ========================== rest ==========================
import { AuthController } from "../auth.controller";
import { AuthService } from "../auth.service";
import { JwtAuthGuard } from "../../security/guards/jwt-auth.guard";
import { CreateUserDto } from "../../users/dtos/create-user.dto";
import { UserSignInDto } from "../dtos/user-sign-in.dto";

describe("AuthController", () => {
  let authController: AuthController;

  let testEmail = "test@gmail.com";
  let testPassword = "password";

  const mockedService = {
    signUp: jest.fn().mockImplementation((dto: CreateUserDto) => {
      const jwt = new JwtService();
      return {
        access_token: jwt.sign(
          { email: "testEmail", password: "testPassword" },
          { secret: "secret_key" }
        ),
      };
    }),
    signIn: jest.fn().mockImplementation((dto: UserSignInDto) => {
      const jwt = new JwtService();
      return {
        access_token: jwt.sign(
          { email: "test@gmail.com", password: "password" },
          { secret: "secret_key" }
        ),
      };
    }),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        JwtModule.register({
          secretOrPrivateKey: "secret key",
        }),
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: JwtAuthGuard,
          useValue: jest.fn().mockImplementation(() => true),
        },
      ],
    })
      .overrideProvider(AuthService)
      .useValue(mockedService)
      .compile();

    authController = module.get<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect(authController).toBeDefined();
  });

  describe("As a user I would like to", () => {
    it("sign in", async () => {
      const newUserSignInDto = {
        email: testEmail,
        password: testPassword,
      };
      const signIn = await authController.signIn(newUserSignInDto);
      expect(signIn).not.toBe(null);
      const jwt = new JwtService();
      const decodedToken = jwt.decode(signIn.token);
      expect(decodedToken).toMatchObject({ email: "test@gmail.com" });
    });
    it("get an error if the email is not valid", async () => {
      const newUserSignInDto: UserSignInDto | any = {
        email: "invalid email",
        password: testPassword,
      };
      try {
        await authController.signIn(newUserSignInDto);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
