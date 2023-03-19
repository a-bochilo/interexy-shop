import { AuthController } from "./../auth.controller";
// ========================== Nest ==========================
import { Test, TestingModule } from "@nestjs/testing";
import { ConfigModule } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { getRepositoryToken } from "@nestjs/typeorm";
import { BadRequestException } from "@nestjs/common";

// ========================== service ==========================
import { SecurityService } from "../../security/security.service";
import { AuthService } from "../auth.service";

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
    role: {
      permissions: ["all"],
    },
    roleType: "user",
    details: { firstname: "Elvis", lastname: "Presley", middlename: "Aaron" },
    created: new Date(),
    updated: new Date(),
    isActive: true,
  };

  const mockUserRepository = {
    createUser: jest.fn().mockResolvedValue(user),
    getAll: jest.fn().mockResolvedValue([user]),
    getInActiveUsers: jest.fn().mockResolvedValue([user]),
    getById: jest.fn().mockResolvedValue(user),
    getUserByEmail: jest.fn().mockResolvedValue(user),
    getUserByPhone: jest.fn().mockResolvedValue(user),
    updateUser: jest.fn().mockResolvedValue(user),
    deleteUser: jest.fn().mockResolvedValue(user),
    findOne: jest.fn().mockResolvedValue({}),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        JwtModule.register({
          secretOrPrivateKey: "Secret key",
        }),
      ],
      providers: [
        AuthService,
        SecurityService,
        {
          provide: getRepositoryToken(UserRepository),
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(RoleRepository),
          useValue: {},
        },
        {
          provide: getRepositoryToken(UserDetailsRepository),
          useValue: {},
        },
        {
          provide: getRepositoryToken(CartRepository),
          useValue: {},
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(authService).toBeDefined();
  });

  describe('As a user I would like to', () => {
    it('sign up with email and password', async () => {
      mockUserRepository.getUserByEmail = jest.fn().mockResolvedValue({
        email: 'test@gmail.com',
        password: '123456',
        passwordConfirm: '123456',
      });
      const registeredUser = await authService.signUp({
        email: 'test@gmail.com',
        password: '123456',
        passwordConfirm: '123456',
      });
      expect(registeredUser).toBeDefined();
      const jwt = new JwtService();
      const decodedToken = jwt.decode(registeredUser.token);
      expect(decodedToken).toMatchObject({ email: 'test@gmail.com' });
    });
  })
});