import { SecurityService } from "../../security/security.service";
// ========================== Nest ==========================
import { Test, TestingModule } from "@nestjs/testing";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { getRepositoryToken } from "@nestjs/typeorm";
import { BadRequestException } from "@nestjs/common";

// ========================== service ==========================
import { AuthService } from "../auth.service";

// ========================== repository ==========================
import { UserRepository } from "../../users/repos/user.repository";
import { RoleRepository } from "../../roles/repos/role.repository";
import { UserDetailsRepository } from "../../users/repos/user-details.repository";
import { CartRepository } from "../../cart/repos/cart.repository";
import { TokenDto } from "../../security/dtos/token.dto";
import { CreateUserDto } from "../../users/dtos/user-create.dto";
import { UserSignInDto } from "../dtos/user-sign-in.dto";

describe("AuthService methods", () => {
  let authService: AuthService;

  const user = {
    id: 1,
    email: "test@gmail.com",
    password: "123456789",
    phone: "375291234567",
    role: {
      permissions: ["all"],
    },
    roleType: "user",
    details: { firstname: "Elvis", lastname: "Presley", middlename: "Aaron" },
    created: new Date(),
    updated: new Date(),
    isActive: true,
  };

  const role = {
    type: "user",
    name: "role name",
    permissions: "all",
  };

  const userDetails = {
    firstname: "Elvis",
    lastname: "Presley",
    middlename: "Aaron",
  };

  const cart = {
    userId: 1,
    user: user,
    items: { cart_id: 1, product_id: "1", quantity: 2 },
  };

  const mockUserRepository = {
    getUserByEmail: jest.fn().mockResolvedValue(user),
    createUser: jest.fn().mockResolvedValue(user),
    getById: jest.fn().mockResolvedValue(user),
  };

  const mockRoleRepository = {
    getRoleByType: jest.fn().mockResolvedValue(role),
    getById: jest.fn().mockResolvedValue(role),
  };

  const mockUserDetailsRepository = {
    createUserDetails: jest.fn().mockResolvedValue(userDetails),
  };

  const mockCartRepository = {
    createCart: jest.fn().mockResolvedValue(cart),
  };

  const mockSecurityService = {
    generateJwt: TokenDto,
    getUser: user,
  };

  const mockAuthService = {
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
            details_id: "1",
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
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(UserRepository),
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(RoleRepository),
          useValue: mockRoleRepository,
        },
        {
          provide: getRepositoryToken(UserDetailsRepository),
          useValue: mockUserDetailsRepository,
        },
        {
          provide: getRepositoryToken(CartRepository),
          useValue: mockCartRepository,
        },
      ],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .overrideProvider(SecurityService)
      .useValue(mockSecurityService)
      .compile();

    authService = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(authService).toBeDefined();
  });

  describe("As a user I would like to", () => {
    it("sign up with email and password", async () => {
      mockUserRepository.getUserByEmail = jest.fn().mockResolvedValue({
        id: 1,
        email: "test@gmail.com",
        password: "password",
        phone: "375291234567",
        role: {
          permissions: ["all"],
        },
        roleType: "user",
        details: {
          firstname: "Elvis",
          lastname: "Presley",
          middlename: "Aaron",
        },
        created: new Date(),
        updated: new Date(),
        isActive: true,
      });

      mockRoleRepository.getRoleByType = jest.fn().mockResolvedValue({
        type: "user",
        name: "role name",
        permissions: "all",
      });

      mockUserDetailsRepository.createUserDetails = jest
        .fn()
        .mockResolvedValue({
          firstname: "Elvis",
          lastname: "Presley",
          middlename: "Aaron",
        });

      mockCartRepository.createCart = jest.fn().mockResolvedValue({
        userId: 1,
        user: user,
        items: { cart_id: 1, product_id: "1", quantity: 2 },
      });

      const signUpToken = await authService.signUp({
        email: "test@gmail.com",
        password: "password",
        phone: "375291234567",
        details: {
          firstname: "Elvis",
          lastname: "Presley",
          middlename: "Aaron",
        },
      });
      expect(signUpToken).toBeDefined();
      const jwt = new JwtService();
      const decodedToken = jwt.decode(signUpToken.token);
      expect(decodedToken).toMatchObject({
        email: "test@gmail.com",
        password: "password",
        phone: "375291234567",
        role: {
          permissions: ["all"],
        },
        roleId: 1,
        details_id: "1",
      });
    });

    it("get an error because such a user already exists", async () => {
      mockUserRepository.getUserByEmail = jest.fn().mockResolvedValue({
        id: 1,
        email: "test@gmail.com",
        password: "password",
        phone: "375291234567",
        role: {
          permissions: ["all"],
        },
        roleType: "user",
        details: {
          firstname: "Elvis",
          lastname: "Presley",
          middlename: "Aaron",
        },
        created: new Date(),
        updated: new Date(),
        isActive: true,
      });

      mockRoleRepository.getRoleByType = jest.fn().mockResolvedValue({
        type: "user",
        name: "role name",
        permissions: "all",
      });

      mockUserDetailsRepository.createUserDetails = jest
        .fn()
        .mockResolvedValue({
          firstname: "Elvis",
          lastname: "Presley",
          middlename: "Aaron",
        });

      mockCartRepository.createCart = jest.fn().mockResolvedValue({
        userId: 1,
        user: user,
        items: { cart_id: 1, product_id: "1", quantity: 2 },
      });

      try {
        await authService.signUp({
          email: "test@gmail.com",
          password: "password",
          phone: "375291234567",
          details: {
            firstname: "Elvis",
            lastname: "Presley",
            middlename: "Aaron",
          },
        });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it("sign in", async () => {
      const signInUser = await authService.signIn({
        email: "test@gmail.com",
        password: "password",
      });
      expect(signInUser).toBeDefined();
      const jwt = new JwtService();
      const decodedToken = jwt.decode(signInUser.token);
      expect(decodedToken).toMatchObject({
        email: "test@gmail.com",
        password: "password",
      });
    });
    
    it("get an error if the password is wrong", async () => {
      const newUserSignInDto: UserSignInDto | any = {
        email: "test@gmail.com",
        password: "wrong password",
      };
      try {
        await authService.signIn(newUserSignInDto);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
