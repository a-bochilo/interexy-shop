// ========================== Nest ==========================
import { JwtModule, JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import { BadRequestException } from "@nestjs/common";

// ========================== rest ==========================
import { AuthController } from "../auth.controller";
import { AuthService } from "../auth.service";
import { CreateUserDto } from "../../users/dtos/create-user.dto";
import { UserSignInDto } from "../dtos/user-sign-in.dto";

describe("AuthController", () => {
  let authController: AuthController;

  const mockedService = {
    signUp: jest.fn().mockImplementation((dto: CreateUserDto) => {
      const jwt = new JwtService();
      return {
        token: jwt.sign(
          {
            email: "test@gmail.com",
            password: "password",
            phone: "375291234567",
            role: {
              permissions: ["all"],
            },
            roleId: 1,
            details_id: 1,
          },
          { secret: "wBfpyN%VTQ!OE%7fj?|EHBx4c" }
        ),
      };
    }),
    signIn: jest.fn().mockImplementation((dto: UserSignInDto) => {
      const jwt = new JwtService();
      return {
        token: jwt.sign(
          { email: "test@gmail.com", password: "password" },
          { secret: "wBfpyN%VTQ!OE%7fj?|EHBx4c" }
        ),
      };
    }),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secretOrPrivateKey: "wBfpyN%VTQ!OE%7fj?|EHBx4c",
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService],
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
      const userSignIn = await authController.signIn({
        email: "test@gmail.com",
        password: "password",
      });
      expect(userSignIn).not.toBe(null);
      const jwt = new JwtService();
      const decodedToken = jwt.decode(userSignIn.token);
      expect(decodedToken).toMatchObject({
        email: "test@gmail.com",
        password: "password",
      });
    });

    it("get an error if the email is not valid", async () => {
      const newUserSignInDto: UserSignInDto | any = {
        email: "invalid email",
        password: "password",
      };
      try {
        await authController.signIn(newUserSignInDto);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe("As a user I would like to", () => {
    it("sign up", async () => {
      const newCreateUserDto: CreateUserDto | any = {
        email: "test@gmail.com",
        password: "password",
        phone: "375291234567",
        role: {
          permissions: ["all"],
        },
        roleId: 1,
        details_id: 1,
      };
      const userSignUp = await authController.signUp(newCreateUserDto);
      expect(userSignUp).not.toBe(null);
      const jwt = new JwtService();
      const decodedToken = jwt.decode(userSignUp.token);
      expect(decodedToken).toMatchObject({
        email: "test@gmail.com",
        password: "password",
        phone: "375291234567",
        role: {
          permissions: ["all"],
        },
        roleId: 1,
        details_id: 1,
      });
    });

    it('get an error if the email is not valid', async () => {
      const newCreateUserDto: CreateUserDto | any = {
        email: "invalidEmail",
        password: "password",
        phone: "375291234567",
        role: {
          permissions: ["all"],
        },
        roleId: 1,
        details_id: 1,
      };
      try{
        await authController.signUp(newCreateUserDto)
      }
      catch(err){
        expect(err).toBeInstanceOf(BadRequestException)
      }
    }
    )
  });
});
