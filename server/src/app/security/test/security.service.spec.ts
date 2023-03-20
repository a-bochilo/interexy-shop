import { JwtModule, JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { Test, TestingModule } from "@nestjs/testing";
import { UserSessionDto } from "../../users/dtos/user-session.dto";
import { RoleRepository } from "../../roles/repos/role.repository";
import { UserRepository } from "../../users/repos/user.repository";
import { JwtStrategy } from "../jwt.strategy";
import { SecurityService } from "../security.service";
import { roleEntity, userEntity } from "./data.mocks";
import { HttpException } from "@nestjs/common";

jest.mock("nestjs-i18n", () => ({
    I18nContext: {
        current: () => ({
            t: () => "text",
        }),
    },
  }));

describe("ProductsService", () => {
    let securityService: SecurityService;

    const mockedUserRepository = {
        getById: jest.fn().mockResolvedValue(userEntity),
    };

    const mockedRoleRepository = {
        getById: jest.fn().mockResolvedValue(roleEntity),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                PassportModule.register({ defaultStrategy: "jwt" }),
                JwtModule.register({
                    secret: process.env.PRIVATE_KEY,
                    signOptions: { expiresIn: "3600s" },
                }),
            ],
            providers: [
                SecurityService,
                JwtStrategy,
                {
                    provide: UserRepository,
                    useValue: mockedUserRepository,
                },
                {
                    provide: RoleRepository,
                    useValue: mockedRoleRepository,
                },
            ],
        }).compile();

        securityService = await module.get(SecurityService);
    });

    it("should be defined", () => {
        expect(securityService).toBeDefined();
    });

    describe("method 'generateJwt'", () => {
        it("should return jwt", async () => {
            const result = await securityService.generateJwt(userEntity);

            expect(result).toBeDefined();

            const jwt = new JwtService();
            const decodedToken = jwt.decode(result.token);

            expect(decodedToken).toMatchObject(
                UserSessionDto.fromEntity(userEntity)
            );
        });
    });

    describe("method 'getUser'", () => {
        it("should return UserEntity with role", async () => {
            const result = await securityService.getUser("id");

            expect(result).toBeDefined();
            expect(result).toMatchObject(userEntity);
        });

        it("should be return error", async () => {
            mockedUserRepository.getById = jest.fn().mockResolvedValue(false);
            try {
                await securityService.getUser('id')
            } catch(error) {
                expect(error).toBeInstanceOf(HttpException);
            }
        })
    });
});
